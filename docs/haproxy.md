# HAProxy - High Availablibility Proxy

<!-- toc -->
- TCP (Layer 4) proxy
- HTTP (Layer 7) proxy

## Terminology
- ACL (Access Control Lists)
    - Condition or rules for traffic flow
    - e.g. acl books path_beg /book
- Frontends
    - Fonrtend bind to one or more ports
    - e.g. Frontend-http binds 80
           Frontend-http binds 443 
    - TLS alpn support 
- Backends
    - Mutiple backend
    - TLS passthrough

## Types of Load balancing
- no load balancing
- Layer 4: TCP
- Layer 7: http

## Loadbalancing algorithm
- roundrobin
- leastconn
- source

## Helath check
- Periodic backend server health check
- auto-removal of unhealthy backend