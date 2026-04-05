# 2.2 Docker Deployment

This section explains how to build and run the webapp as a Docker
container, and how to integrate it with common self-hosting tools.

---

## Overview

The webapp is a **static single-page application** (SPA) built with
React and Vite. The build output is a set of plain HTML, CSS, and
JavaScript files that are served by an nginx container.

A two-stage Dockerfile is provided:

1. **Build stage** — Node 20 Alpine + pnpm compiles the sources into
   `/app/dist`.
2. **Serve stage** — nginx Alpine copies the compiled assets and exposes
   port `80`.

Because the runtime image contains only nginx and static files, the
memory and CPU footprint is deliberately small.

---

## Resource Requirements

| Resource | Limit       | Reservation |
|----------|-------------|-------------|
| CPU      | 0.25 cores  | 0.05 cores  |
| Memory   | 64 MB       | 16 MB       |

These values reflect a lightly loaded static-file service. Adjust them
in `docker-compose.yml` under the `deploy.resources` key if you expect
higher traffic.

---

## Building and Running Locally

### Build the image

```bash
docker build -t template-repository-webapp .
```

### Run the container

```bash
docker run -d --name webapp -p 3000:80 template-repository-webapp
```

The app is now available at <http://localhost:3000>.

### Using Docker Compose

```bash
# Start both the webapp and the MkDocs documentation server
docker compose up -d

# Rebuild after a source change
docker compose up -d --build webapp
```

### Verify the health endpoint

The nginx configuration exposes a lightweight health probe at `/healthz`:

```bash
curl http://localhost:3000/healthz
# ok
```

---

## Ports

| Host port | Container port | Description           |
|-----------|----------------|-----------------------|
| `3000`    | `80`           | Webapp (nginx)        |
| `8000`    | `8000`         | MkDocs documentation  |

Change the host port in the `ports` mapping of `docker-compose.yml` if
`3000` is already taken on your host.

---

## Traefik Integration

Traefik is a popular reverse proxy. Enable the labels in
`docker-compose.yml` and connect the container to the external Traefik
network:

```yaml
services:
  webapp:
    # ... (other settings)
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.webapp.rule=Host(`app.example.com`)"
      - "traefik.http.routers.webapp.entrypoints=websecure"
      - "traefik.http.routers.webapp.tls.certresolver=letsencrypt"
      - "traefik.http.services.webapp.loadbalancer.server.port=80"
    networks:
      - traefik_public

networks:
  traefik_public:
    external: true
```

Traefik discovers the container automatically and issues a TLS
certificate via Let's Encrypt.

---

## NGINX Proxy Manager Integration

[nginx Proxy Manager](https://nginxproxymanager.com/) (NPM) provides a
web UI to manage reverse-proxy rules.

1. In `docker-compose.yml`, keep the `ports` mapping (e.g., `3000:80`)
   so NPM can reach the container.
2. In the NPM dashboard, create a **Proxy Host**:
   - **Domain Names**: `app.example.com`
   - **Scheme**: `http`
   - **Forward Hostname / IP**: the Docker host IP or container name
   - **Forward Port**: `3000`
   - Enable **Block Common Exploits** and **Websockets Support** if
     needed.
   - On the **SSL** tab, request a Let's Encrypt certificate.

No label configuration is needed; NPM uses its own database.

---

## Tailscale Integration

[Tailscale](https://tailscale.com/) lets you expose the container
exclusively on your private mesh network.

Use the Tailscale sidecar pattern: a `tailscale` service shares its
network namespace with the `webapp` service so that nginx binds to the
Tailscale interface.

```yaml
services:
  webapp:
    # Remove the host ports mapping — access is through Tailscale only
    # ports:
    #   - "3000:80"
    network_mode: "service:tailscale"
    depends_on:
      - tailscale

  tailscale:
    image: tailscale/tailscale:latest
    hostname: template-repository
    environment:
      - TS_AUTHKEY=${TS_AUTHKEY}
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_USERSPACE=false
    volumes:
      - tailscale_state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - NET_RAW
    restart: unless-stopped

volumes:
  tailscale_state:
```

Set `TS_AUTHKEY` in a `.env` file (never commit this file). The machine
will appear in your Tailscale admin console as `template-repository` and
will be reachable at its Tailscale IP on port `80`.

---

## Dokploy Integration

[Dokploy](https://dokploy.com/) is a self-hosted PaaS that manages
Docker-based deployments.

1. In the Dokploy dashboard, create a new **Application**.
2. Point it at this repository (or a container registry where the image
   is published).
3. Set the **Dockerfile path** to `Dockerfile`.
4. Set the **Port** to `80` (the container port exposed by nginx).
5. Configure the **Domain** in Dokploy's proxy settings — Dokploy
   handles Traefik configuration automatically.
6. Set any required **Environment Variables** (e.g., `TS_AUTHKEY` if
   using Tailscale).

Dokploy will build the image, deploy the container, and wire up the
reverse proxy without any manual `docker compose` commands.

---

## Publishing the Image

To publish the image to GitHub Container Registry so that other hosts
can pull it without rebuilding:

```bash
docker build -t ghcr.io/your-org/template-repository-webapp:latest .
docker push ghcr.io/your-org/template-repository-webapp:latest
```

The `docker-compose.yml` references this registry image via the `image`
key. When `build` is also specified, Compose uses the local build and
tags the resulting image accordingly.
