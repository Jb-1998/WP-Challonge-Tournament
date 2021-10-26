import React from "react";
import { Table } from "antd";
import moment from 'moment';;


const ParticipantsTable = (props) => {

    const columns = [
        {
            title: 'Player Id',
            key: 'id',
            render: (text, record) => {
                return (
                    <p>{record.participant.id}</p>
                )
            }
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => {
                return (
                    <p>{record.participant.name}</p>
                )
            }
        },
        {
            title: 'Player Status',
            key: 'status',
            render: (text, record) => {
                return (
                    <p>{record.participant.active ? "Active" : "In Active"}</p>
                )
            }
        },
        {
            title: 'Player Rank',
            key: 'rank',
            render: (text, record) => {
                return (
                    <p>{record.participant.final_rank ? record.participant.final_rank : "No Rank Yet"}</p>
                )
            }
        },
        {
            title: 'Date Participated',
            key: 'date',
            render: (text, record) => {
                return (
                    <p>{moment(record.participant.created_at).format("MMMM DD, YYYY h:mm:ss a")}</p>
                )
            }
        },
        {
            title: 'Current Seed',
            key: 'seed',
            render: (text, record) => {
                return (
                    <p>{record.participant.seed}</p>
                )
            }
        },
    ];

    return (
        <Table pagination={{ pageSize: 5 }} dataSource={props.participants} columns={columns} size="small" />
    )
}

export default ParticipantsTable;