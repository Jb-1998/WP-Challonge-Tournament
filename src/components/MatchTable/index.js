import React from "react";
import { Table } from "antd";
import moment from 'moment';


const MatchTable = (props) => {

    const columnsMatches = [
        {
            title: 'Match Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.id}</p>
                )
            }
        },
        {
            title: 'Round',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.round}</p>
                )
            }
        },
        {
            title: 'First Player Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.player1_id}</p>
                )
            }
        },
        {
            title: 'Second Player Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.player2_id}</p>
                )
            }
        },
        {
            title: 'Match Date',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{moment(record.match.created_at).format("MMMM DD, YYYY h:mm:ss a")}</p>
                )
            }
        },
        {
            title: 'Winner Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.winner_id ? record.match.winner_id : "No winner yet"}</p>
                )
            }
        },
        {
            title: 'Loser Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.match.loser_id ? record.match.loser_id : "No loser yet"}</p>
                )
            }
        },
    ]

    return (
        <Table pagination={{ pageSize: 5 }} dataSource={props.matches} data-testid="match-table" columns={columnsMatches} size="small" />
    )
}

export default MatchTable;