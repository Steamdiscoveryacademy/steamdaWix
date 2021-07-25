let dblog_schema = `{
    "source": "https://api.drupal.org/api/drupal/core%21modules%21dblog%21dblog.install/function/dblog_schema/8.5.x",
    "watchdog": {
        "description": "Table that contains logs of all system events.",
        "fields": {
            "wid": {
                "type": "serial",
                "not null": TRUE,
                "description": "Primary Key: Unique watchdog event ID.",
            },
            "uid": {
                "type": "text",
                "not null": TRUE,
                "description": "Because WiX this is changed.",
            },
            "type": {
                "type": "varchar_ascii",
                "length": 64,
                "not null": TRUE,
                "default": "",
                "description": "Type of log message, for example zQQzuserzQQz or zQQzpage not found.zQQz",
            },
            "message": {
                "type": "text",
                "not null": TRUE,
                "size": "big",
                "description": "Text of log message to be passed into the t() function.",
            },
            "severity": {
                "type": "int",
                "unsigned": TRUE,
                "not null": TRUE,
                "default": 0,
                "size": "tiny",
                "description": "The severity level of the event; ranges from 0 (Emergency) to 7 (Debug)",
            },
            "severity_word": {
                "type": "int",
                "unsigned": TRUE,
                "not null": TRUE,
                "default": 0,
                "size": "tiny",
                "description": "The severity level of the event as word; array from 0 to 7 ['EMERGENCY','ALERT','CRITICAL','ERROR','WARNING','NOTICE','INFO','DEBUG']",
            },
            "link": {
                "type": "text",
                "not null": FALSE,
                "description": "Link to view the result of the event.",
            },
            "location": {
                "type": "text",
                "not null": TRUE,
                "description": "URL of the origin of the event.",
            },
            "referer": {
                "type": "text",
                "not null": FALSE,
                "description": "URL of referring page.",
            },
            "hostname": {
                "type": "varchar_ascii",
                "length": 128,
                "not null": TRUE,
                "default": "",
                "description": "Hostname of the user who triggered the event.",
            },
            "timestamp": {
                "type": "int",
                "not null": TRUE,
                "default": 0,
                "description": "Unix timestamp of when event occurred.",
            }
        },
        "schema_data": {
            "primary key": {
                "wid": "wid"
            },
            "indexes": {
                "type": {
                    "type": "type"
                },
                "uid": {
                    "uid": "uid"
                },
                "severity": {
                    "severity": "severity"
                }
            }
        }
    }
}`;