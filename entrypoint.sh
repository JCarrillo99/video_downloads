#!/bin/bash
echo "Verificando instalación de Node..."
# Obtener la versión de Node.js
node_version=$(node --version 2>/dev/null || echo "No está instalado")
echo "Node.js: $node_version"

yarn install

node index.js