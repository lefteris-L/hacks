# Custom hacking and encrypting tools written in node.js

**For the fuzzing function:**
- To find subdirectories/pages of a website execute with this argument: ```--fuzz=https://url-to-fuzz.com```
- Any response codes in 200s will be returned along with the actual word
- Use this with caution as the volume of the requests might get your IP blocked or DDOS the server 💀💀
- This is only for testing purposes and practice and not meant for actual hacking or illegal activities

**For the encryption/decryption functions:**
- To encrypt execute **main.js** from the *cli* with this argument: ```--enc="Your message/password here"``` 
- You'll get a **base64** string containing **the actual message, the key, iv, and authTag** needed for decryption; ***YOU SHOULD SAVE THIS***
- To decrypt use the arg ```--dec=theEncryptedStringYouSaved```
