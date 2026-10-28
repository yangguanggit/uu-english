# Docker Official Image mirror; pin the verified multi-platform digest.
FROM public.ecr.aws/docker/library/nginx:1.30.6-alpine-slim@sha256:dede8895648b461178c3bc604f7eed4423efe5220b2c4d839f5eb3d34ac3f8f7

LABEL org.opencontainers.image.title="UU说英语" \
      org.opencontainers.image.version="1.0.1" \
      org.opencontainers.image.source="https://github.com/yangguanggit/uu-english"

# Build dist with npm run build before building this image.
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx/uu-english.conf /etc/nginx/conf.d/default.conf
COPY dist/ /srv/uu-english/current/
RUN sed -i 's/server_name uu-english.test.example.com;/server_name _;/' /etc/nginx/conf.d/default.conf \
    && rm -f /srv/uu-english/current/.build.json

USER 101:101
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
