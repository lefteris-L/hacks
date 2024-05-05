# Custom hacking and encrypting tools written in node.js

**For the encryption/decryption functions:**
- To encrypt execute **main.js** from the *cli* with this argument: ```--enc="Your message/password here"``` 
- You'll get a **base64** string containing **the actual message, the key, iv, and authTag** needed for decryption; ***YOU SHOULD SAVE THIS***
- To decrypt use the arg ```--dec=theEncryptedStringYouSaved```
