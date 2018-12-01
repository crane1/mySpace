cat /data/bak.sh
#!/bin/bash

logs_dir=/root/webApp/mySpace/data/
bak_dir=/root/backup
bak_file=access_`date +%Y%m%d`.log
# tar everyday
#echo "begining of tar"
tar zcf $bak_dir/$bak_file.gz $logs_dir/talk.json

# clear bak_file
#echo "clearing file.log"
find $bak_dir -mtime +7 -exec rm -rf {} \;

#end