# hackaServe commands
### Why not know what you're doing when you're butchering a console

## All Commands
- ```$ Hackaserve init <name>```
- ```$ Hackaserve add-attendee <attendee_name>```
- ```$ Hackaserve add-attendee-from-csv <csvfilename>```
- ```$ Hackaserve add-message <message_name>```
- ```$ Hackaserve send <message_name>```

## HackaServe Init - Initialise a hackathon
```$ Hackaserve init <name>```
### Purpose
Initialise a new hackathon in a new subdirectory with the given name. We initialise a hackathon by
creating a hackathon YAML, this can be done manually, see hackathon.yaml doc for more details
### Flags
- ```-x, --wxample_yml``` - generates a attendees.yml with example format of how data should be laid out
useful for first timers of hackaserve
- ```-tk <key> OR --twilio_key <key>``` - Specify the key for the twilio account you're using to send text messages from*
- ```-ti <id> OR --twilio_id <id>```- Specify the account ID of the twilio account you're using to send text messages from
- ```-tn <number> OR --twilio_number <number>``` - Specify the number on your twilio account to send texts from, don't 
use spaces, we can't detect a full number with spaces in and we won't be adding it as a feature.
#### Footnotes
\* The details taken about twilio here give people access to your twilio account and hence your twilio credit, ensure you
do not push this folder or contents to somewhere whwre nefarious individuals can access it (Such as a public GitHub repo)
For more info, see twilio.md and protectingdata.md/

## HackaServe add-attendee - add a sole attendee
```$ Hackaserve add-attendee <attendee_name>```
### Purpose
Add an attendee to your attendees.yml from the command line. This 
will be a painfully slow process if you do this for all of your 
attendees. If you have a csv file, use the add-attendees-from-csv
command instead*.
### Flags
- ```-e <email> OR --email <email>``` - the email of the attendee you're adding
- ```-t <telephone> OR --telephone <telephone>``` - the telephone of the attendee you're adding. No spaces in the number.
- ```-g <groups> OR --groups <groups>``` - The groups of the attendee you're adding i.e. ```-g team-kcl,vegan ```
this command cannot currently handle spaces between groups, each group should be comma delimited (separated by commas) as shown
in the example
#### Footnotes
If you're reading this long before your event is due to start, 
consider filing an issue with how you expect your attendee data to be
formatted and if it's high demand I might pick up the ticket.

Or better yet you could create a pull request with a command that converts
your chosen format to our yaml format
## HackaServe add-attendees-from-csv - add a group of attendees from a csv
```$ Hackaserve add-attendees-from-csv <csv_filename>```
### Purpose
Add a set of attendees from a csv file. This runs an interactive console session in which a row of data is loaded from your csv and
the console will ask you questions about each item. It will ask you to identify what piece of data the column. For example it may go
"what is this data: 07485 392 439?" and expect a response telephone. 

This command will explain the responses it is expecting when it's run
### Flags
- ```-o OR --overwrite``` - overwrites an existing Attendees.yml file with the given CSV (will warn you about this)
## HackaServe add-message - add a message to the hackathon.yml file
```$ Hackaserve add-message <message_name>```
### Purpose
Add a new message to the hackathon.yml to be sent using the hackaserve "send" command.
### Flags
- ```-b <text> OR --body <text>``` - The message you wish to send to your attendees
