#!/bin/sh

# parameters
# $1: unique id
# $2: splashScreen filename
# $3: launcherIcon filename
# $4  appName
# $5  url
# $6  primaryColor
# $7  secondaryColor
# $8  camera
# $9  externalUrls
# $10  gps
# $11  progressBar
# $12  ratingDays
# $13  ratings
# $14  uploads
# $15  zoom
# $16  orientation
# $17  callback URL

cd $HOME/packapp/remote-builds
mkdir $1
cd $1
git clone https://github.com/dambusm/packapp-android

# Grab images from cloud storage bucket
gsutil cp gs://projectcountdown-195619.appspot.com/$2 $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/raw/front_splash.png

gsutil cp gs://projectcountdown-195619.appspot.com/$3 $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/ic_launcher.png

# Find and replace placeholders with values
find . -type f -name "*" -exec sed -i'' -e "s|<appName>|$4|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<url>|$5|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<primaryColor>|$6|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<secondaryColor>|$7|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<camera>|$8|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<externalUrls>|$9|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<gps>|$10|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<progressBar>|$11|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<ratingDays>|$12|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<ratings>|$13|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<uploads>|$14|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<zoom>|$15|g" {} +
find . -type f -name "*" -exec sed -i'' -e "s|<orientation>|$16|g" {} +

$HOME/android-asset-resizer/android-asset-resizer/bin/./aaresize $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/ic_launcher.png -o $HOME/packapp/remote-builds/$1/packapp-android/app/src/main -x
sleep 3s
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/ic_launcher.png $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/web_hi_res_512.png
rm -r $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-hdpi
rm -r $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-mdpi
rm -r $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xhdpi
rm -r $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xxhdpi
rm -r $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xxxhdpi
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/drawable-xxxhdpi $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xxxhdpi
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/drawable-xxhdpi $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xxhdpi
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/drawable-xhdpi $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-xhdpi
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/drawable-hdpi $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-hdpi
mv $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/drawable-mdpi $HOME/packapp/remote-builds/$1/packapp-android/app/src/main/res/mipmap-mdpi
cd $HOME/packapp/remote-builds/$1/packapp-android/
if ./gradlew build; then
    printf 'Build succeeded'
    cd $HOME/packapp/remote-builds/$1/packapp-android/app/build/outputs/apk/debug/
    gsutil cp app-debug.apk gs://projectcountdown-195619.appspot.com/$1.apk
    printf 'Google cloud storage upload successful upload successful'
    gsutil acl ch -u AllUsers:R gs://projectcountdown-195619.appspot.com/$1.apk
    printf 'Made built apk file public'
    curl -i -d "id=$1&builtApk=$1.apk&secret=$SECRET" -X PUT $17
    printf 'Remote build and upload successful'
else
    curl -i -d "id=$1&builtError=shellScriptExited&secret=$SECRET" -X PUT $17
    printf 'BUILD FAILED'
fi
printf 'Build script finished'