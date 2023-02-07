# Create an instance of HaiKei

Creating a personal instance of HaiKei is really simple as long as you have basic nodeJS knowledge

## Prerequisites:

Prerequisites for hosting a HaiKei instance are
```
1. NodeJS / npm 
2. Yarn (node module)
3. Redis (or Memurai for Windows users.)
4. Git
5. Patience (optional)
6. Incredibly basic terminal knowledge
```

## Putting it all together

First run `git clone https://github.com/wearrrrr/HaiKei` to create a local copy of the repository<br>
Then run `cd HaiKei` to get into the HaiKei directory.<br>
Then run `npm install -g yarn` if you haven't already<br>
Then `cd consumet-api`<br>
Now simply `yarn` to install all the node modules for consumet<br>
Then `cd ../` to go back one directory and run `yarn` again to install the HaiKei node modules.<br>

Almost there!<br>

Now finally you can run `npm start` and the script will automatically start Memurai or Redis (platform dependent), consumet-api (included in the repo) and the HaiKei frontend.<br>

Enjoy your private instance of HaiKei! (^///^) <br>

Don't you feel proud of yourself?<br>
