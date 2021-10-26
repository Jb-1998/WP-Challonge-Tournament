const express = require('express');
const cors = require('cors');
const request = require("request");
const pino = require('express-pino-logger')();
const api_key = process.env.API_KEY;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino);

app.post("/tournament", (req, res) => {
    const body = req.body;
    console.log("Request Body: ", req.body);
    if (body) {
        request.post(
            {
                url: "https://api.challonge.com/v1/tournaments.json",
                form: {
                    "api_key": api_key,
                    "tournament": body.tournament,
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            },
            (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    const responseError = JSON.parse(body);
                    return res.status(500).send({ error: responseError });
                }
                res.json(JSON.parse(body));
            }
        );
    }
});
app.post("/participant", (req, res) => {
    const body = req.body;
    console.log("Request Body Participants: ", body);
    if (body) {
        request.post(
            {
                url: `https://api.challonge.com/v1/tournaments/${body.tournamentId}/participants.json`,
                form: {
                    "api_key": api_key,
                    "participant": body.participant
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            },
            (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    const responseError = JSON.parse(body);
                    return res.status(500).send({ error: responseError });
                }
                res.json(JSON.parse(body));
            }
        )
    }
})

app.post("/start", (req, res) => {
    const body = req.body;
    console.log("All body: ", body)
    if (body) {
        request.post(
            {
                url: `https://api.challonge.com/v1/tournaments/${body.tournamentId}/start.json`,
                form: {
                    "api_key": api_key,
                    "include_participants": body.include_participants
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            },
            (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    const responseError = JSON.parse(body);
                    return res.status(500).send({ error: responseError });
                }
                res.json(JSON.parse(body));
            }
        )
    }
})
app.get("/tournaments", (req, res) => {
    request.get(
        {
            url: `https://api.challonge.com/v1/tournaments.json?api_key=${api_key}`,
            form: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                const responseError = JSON.parse(body);
                return res.status(500).send({ error: responseError });
            }
            res.json(JSON.parse(body));
        }
    )
})

app.get("/participants", (req, res) => {
    const tournamentId = req.query.tournamentId;
    request.get(
        {
            url: `https://api.challonge.com/v1/tournaments/${tournamentId}/participants.json?api_key=${api_key}`,
            form: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                const responseError = JSON.parse(body);
                return res.status(500).send({ error: responseError });
            }
            res.json(JSON.parse(body));
        }
    )
})
// get all matches
app.get("/matches", (req, res) => {
    const tournamentId = req.query.tournamentId;
    request.get(
        {
            url: `https://api.challonge.com/v1/tournaments/${tournamentId}/matches.json?api_key=${api_key}`,
            form: {},
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                const responseError = JSON.parse(body);
                return res.status(500).send({ error: responseError });
            }
            res.json(JSON.parse(body));
        }
    )
})

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);