#!/bin/bash

# Replace @jctop-event/shared-types with local types
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/@jctop-event\/shared-types/@\/types/g" {} \;

# Replace @shared/types with local types  
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/@shared\/types/@\/types/g" {} \;

echo "Import paths fixed!"