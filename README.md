# Norigin Media Mock API

- Based on RAML: [http://raml.org/](http://raml.org/).

```zsh
npm install
npm run start:demo
```

- E.g. navigate to [http://localhost:1337/anonymous](http://localhost:1337/anonymous).

- To modify endpoints, go to `demo.raml`.

- You can create new .raml configurations. Add the new command in `package.json` e.g. `start:demo` with a reference
to a new .raml file.

- Endpoints pointing to specific resource like `/channels/{channelId}/stream` will always return the same result.
To have a specific response, add an explicit endpoint like `/channels/my_specific_channel/stream`.

- Static JSON responses are in `examples/demo` folder.

- For another environments you can put them to different folders.

- If you need to use some existing content,
just fetch the real data raw JSON,
format it with [this](https://jsonformatter.curiousconcept.com/), put into JSON file in `examples`, happy days.

- To update the EPG data to current day, use `npm run update:epg`

# Mock API deployment

- Jenkins job is `dev-mock-deploy`

- Environment is `http://dev-mock.noriginmedia.com/`
