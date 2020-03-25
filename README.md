# COVID19 India Cluster Network Graph

This is a dashboard of network connections and clusters to track outbreak and transmission COVID19 in India. The primary data source is collected by volunteers at [covid19india.org](https://www.covid19india.org), a crowdsourced database collated from various news as well as government sources. This can be forked and connected to your Google sheet too. The intention of this graph is to open up options for analysis for policy/decision makers so that they can be more strategic in testing cases and deploying resources like ventilators, beds & medicines.

Primary app is at [https://covid19india-network.now.sh](https://covid19india-network.now.sh/).

![enter image description here](https://i.ibb.co/dmNDthW/Screen-Shot-2020-03-19-at-9-15-51-PM.png)

## Roadmap

1.  More precise cluster filters based on state, district, travel abroad etc
2.  NLP based analysis of Notes section to find out relationship info, travel history etc.
3.  Travel history of locations visited of patients, stay time etc.

## Data Sources

#### Patient data :

- Unofficial sources: https://api.rootnet.in/covid19-in/unofficial/sources
- Unofficial patient tracing data: https://api.rootnet.in/covid19-in/unofficial/covid19india.org

Credits : [https://github.com/amodm/api-covid19-in](https://github.com/amodm/api-covid19-in)

### Spreadsheet :

- [https://docs.google.com/spreadsheets/d/1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk/edit#gid=0](https://docs.google.com/spreadsheets/d/1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk/edit#gid=0)

Submit new cases [here](https://aka.ms/reportcovid) !

### NLP Extraction From Unstructured Notes :

Credits : [https://github.com/NirantK/coronaIndia](https://github.com/NirantK/coronaIndia)

#### Credits

- Awesome team at [covid19india.org](https://www.covid19india.org/)

## Customizing

This app can be hooked to any google sheets based database. Is currently based on [covid19india.org](<[https://docs.google.com/spreadsheets/d/1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk/edit#gid=0](https://docs.google.com/spreadsheets/d/1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk/edit#gid=0)>) live crowdsourced patient database. Edit client_secrets.json and modify the endpoint in the /api folder to hook it to your own, then deploy to zeit.co to have it working online.

## Issues

Submit an issue or feature request at [issues](https://www.covid19india.org/) or contact the maintainers.

## Maintainers

- [sibeshkar](https://github.com/sibeshkar)
- [someshkar](https://github.com/someshkar)

## Contributing

### Install packages :

```bash

npm install

# or

yarn install

```

### Run Development server with hot-reloading:

```bash

npm run dev

# or

yarn dev

#or

// if you have now CLI

now dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on ZEIT Now

The easiest way to deploy this app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) .
