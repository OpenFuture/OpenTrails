curl "localhost:8081/index.android.bundle?platform=android&dev=false&minify=true" -o "android/app/src/main/assets/index.android.bundle"

cd android && ./gradlew assembleRelease
