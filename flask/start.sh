#!/bin/bash
#!/bin/bash
if [[ -z $(grep dockerhost /etc/hosts) ]]
then
    echo `/sbin/ip route|awk '/default/ { print $3 }'` dockerhost >> /etc/hosts
fi

gunicorn -w 4 -b 0.0.0.0:5010 wsgi:app