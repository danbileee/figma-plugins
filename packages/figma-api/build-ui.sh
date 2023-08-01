#!/usr/bin/env sh
source .env.$TARGET
cd dist
touch ui.html
cat > ui.html << EOF
<script>
  window.location.href = "$UI_DOMAIN"
</script>
EOF