import React, { useState, useEffect } from "react";

// Ant Design Library
import { Layout, Button, Input, Tabs, notification, Card, List, Modal, Drawer, Select } from "antd";
import { Form as FormAntDesign } from "antd";

// Common or Reusable components
import Header from "../../components/PageHeader/index";
import ParticipantsTable from "../../components/ParticipantsTable/index"
import MatchTable from '../../components/MatchTable/index'

// Tournament Screen Styles
import "./styles.css";

// API request library 
import axios from "axios";

// Constants
import gameDetails from '../../constants/gameDetails.json'

// Destructured Components
const { TabPane } = Tabs;
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const TournamentScreen = (props) => {
    // COMPONENT STATES
    // Loading states
    const [loading, setLoading] = useState(false);
    const [participantsLoading, setParticipantsLoading] = useState(false);
    const [startTournamentLoading, setStartTournamentLoading] = useState(false);

    // Drawer and Modal states
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isTournamentModalVisible, setIsTournamentModalVisible] = useState(false);
    const [isParticipantModalVisible, setIsParticipantModalVisible] = useState(false);


    // Object States
    const [tournamentObject, setTournamentObject] = useState({});
    const [allTournaments, setAllTournaments] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [matches, setMatches] = useState([]);


    // Create Tournament Form States
    const [tournamentDescription, setTournamentDescription] = useState("");
    const [tournamentFormat, setTournamentFormat] = useState("");
    const [tournamentName, setTournamentName] = useState("");
    const [gameName, setGameName] = useState("");

    // Add Participant Form States
    const [participantName, setParticipantName] = useState("");
    const [participantEmail, setParticipantEmail] = useState("");

    // Drawer Functions
    const showDrawer = () => {
        setIsDrawerVisible(true);
    };
    const closeDrawer = () => {
        setTournamentName('');
        setGameName("");
        setTournamentFormat("");
        setTournamentDescription("");
        setIsDrawerVisible(false);
    };

    // Tournament Modal Component Function
    const showTournamentModal = (tournament) => {
        setIsTournamentModalVisible(true);
        setTournamentObject(tournament);
        getAllParticipants(tournament.id);
        getAllMatches(tournament.id);
    }
    const closeTournamentModal = () => {
        setIsTournamentModalVisible(false);
    }

    // Participant Modal Component Function
    const showParticipantModal = () => {
        setIsParticipantModalVisible(true);
    }
    const closeParticipantModal = () => {
        setIsParticipantModalVisible(false);
    }

    // Ant Design Form Configuration
    const [form] = FormAntDesign.useForm();
    const [requiredMark, setRequiredMarkType] = useState("optional");
    const onRequiredTypeChange = ({ requireMarkValue }) => {
        setRequiredMarkType(requireMarkValue);
    };

    // Dropdown Component Handler
    const handleTournamentFormat = (format) => {
        setTournamentFormat(format);
    }
    const handleGameName = (gameName) => {
        setGameName(gameName);
    }

    // GET REQUEST FUNCTIONS
    const getAllTournaments = () => {
        axios.get("/tournaments").then((res) => {
            setAllTournaments(res.data);
        })
    }
    const getAllParticipants = (tournamentId) => {
        axios.get(`/participants?tournamentId=${tournamentId}`).then((res) => {
            setParticipants(res.data);
        })
    }
    const getAllMatches = (tournamentId) => {
        axios.get(`/matches?tournamentId=${tournamentId}`).then((res) => {
            setMatches(res.data);
        })
    }

    // Tournament Form Submit Request Function
    const submitTournament = () => {
        setLoading(true);
        if (tournamentName && gameName && tournamentDescription && tournamentFormat) {
            axios.post("/tournament",
                {
                    "tournament": {
                        "name": tournamentName,
                        "game_name": gameName,
                        "description": tournamentDescription,
                        "tournament_type": tournamentFormat,
                    },
                },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => {
                closeDrawer()
                setLoading(false);
                notification['success']({
                    message: "Tournament Creation",
                    description: "Tournament has been succesfully created!",
                });
                getAllTournaments()
            }).catch((err) => {
                console.log("error: ", err)
                notification['error']({
                    message: "Tournament Creation",
                    description: `${err.response.data.error.errors[0]}`,
                });
            });
        } else {
            setLoading(false);
            notification['error']({
                message: "Tournament Creation",
                description: `Can't Process. Tournament Information Incomplete`,
            });
        }

    };

    const createNewParticipants = (tournamentId) => {
        setParticipantsLoading(true)
        axios.post("/participant",
            {
                "tournamentId": tournamentId,
                "participant": {
                    "name": participantName,
                    "email": participantEmail
                },
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            }
        ).then((data) => {
            setParticipantName("");
            setParticipantEmail("")
            setIsParticipantModalVisible(false)
            setParticipantsLoading(false)
            notification['success']({
                message: "Participant Creation",
                description: "Participant has been succesfully added!",
            });
            getAllParticipants(tournamentId)
        }).catch((err) => {
            notification['error']({
                message: "Participant Creation",
                description: `${err.response.data.error.errors[0]}`,
            });
        })
    }
    const startTournament = (tournamentId) => {
        setStartTournamentLoading(true)
        axios.post(`/start`,
            {
                "tournamentId": tournamentId,
                "include_participants": participants,
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }).then((data) => {
                setStartTournamentLoading(false)
                notification['success']({
                    message: "Tournament Status",
                    description: "Tournament Started Succesfully",
                });
                getAllMatches(tournamentId)
            }).catch((err) => {
                setStartTournamentLoading(false)
                notification['error']({
                    message: "Starting Tournament Failed",
                    description: `${err.response.data.error.errors[0]}`,
                });
            })
    }

    // Initial Request for Getting all tournaments
    useEffect(() => {
        getAllTournaments()
    }, [])
    return (
        <Layout className="layout-style">
            <Header />
            <Content className="content-style">
                <Modal
                    title={"Add Participants"}
                    visible={isParticipantModalVisible}
                    onOk={closeParticipantModal}
                    onCancel={closeParticipantModal}
                    centered
                    width={"30vw"}
                    bodyStyle={{ height: "100%" }}
                    footer={[
                        <Button key="back" onClick={closeParticipantModal}>Cancel</Button>,
                        <Button key="submit" type="primary" loading={participantsLoading} onClick={() => { createNewParticipants(tournamentObject.id) }}>Create Participant</Button>,
                    ]}
                >
                    <FormAntDesign
                        form={form}
                        layout={"vertical"}
                        initialValues={{
                            requiredMarkValue: requiredMark,
                        }}
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={requiredMark}
                        className="form-container-style"
                    >
                        <div className="form-header-container-style">
                            <p className="form-title-style">
                                Add Tournament Participants
                            </p>
                        </div>
                        <FormAntDesign.Item
                            label={
                                <p className="form-label-style">
                                    Participant's Name
                                </p>
                            }
                            required
                        >
                            <p className="form-description-style">
                                Add name for the participants who will be joining in the tournament
                            </p>
                            <Input
                                placeholder="Participant's Name"
                                value={participantName}
                                onChange={(e) => setParticipantName(e.target.value)}
                            />
                        </FormAntDesign.Item>
                        <FormAntDesign.Item
                            label={
                                <p className="form-label-style">
                                    Participant's Email
                                </p>
                            }
                            required
                        >
                            <p className="form-description-style">
                                Provide the participants email address
                            </p>
                            <Input
                                placeholder="Participant's email"
                                value={participantEmail}
                                onChange={(e) => setParticipantEmail(e.target.value)}
                            />
                        </FormAntDesign.Item>
                    </FormAntDesign>
                </Modal>
                <Modal title={tournamentObject.name} visible={isTournamentModalVisible} onOk={closeTournamentModal} onCancel={closeTournamentModal} centered width={"55vw"} bodyStyle={{ height: "100%", }}>
                    <p style={{ fontSize: 15, fontWeight: "bold" }}>Tournament Format</p>
                    <p style={{ fontSize: 12, width: "90%", marginTop: -10 }}>{tournamentObject.tournament_type}</p>
                    <Tabs
                        tabBarExtraContent={
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <Button
                                    type="primary"
                                    size="middle"
                                    onClick={() => { showParticipantModal() }}
                                    className="add-participant-btn-style"
                                    danger
                                >
                                    Add Participants
                                </Button>
                                <Button
                                    type="primary"
                                    size="middle"
                                    className="start-tournament-btn-style"
                                    onClick={() => { startTournament(tournamentObject.id) }}
                                    loading={startTournamentLoading}
                                >
                                    Start Tournament
                                </Button>
                            </div>

                        }
                    >
                        <TabPane
                            tab="📝 Details"
                            key="1"
                        >
                            <div className="details-tab-container-style">
                                <p className="details-title-style">Tournament Details</p>
                                <p className="details-description-style">{tournamentObject.description}</p>
                                <p className="details-title-style">About the Game</p>
                                <p className="details-description-style">{tournamentObject.game_name ? gameDetails.find(val => val.name === tournamentObject.game_name).description : ""}</p>
                            </div>

                        </TabPane>
                        <TabPane
                            tab="🤺 Participants"
                            key="2"
                        >
                            <p className="details-title-style">List of Participants</p>
                            <ParticipantsTable participants={participants} />
                        </TabPane>
                        <TabPane
                            tab="🎮 Matches"
                            key="3"
                        >
                            <p className="details-title-style">List of Matches</p>
                            <MatchTable matches={matches} />
                        </TabPane>
                    </Tabs>
                </Modal>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={closeDrawer}
                    visible={isDrawerVisible}
                    width={"25vw"}
                >
                    <FormAntDesign
                        form={form}
                        layout={"vertical"}
                        initialValues={{
                            requiredMarkValue: requiredMark,
                        }}
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={requiredMark}
                        style={{
                            overflowY: "auto",
                            height: "80vh",
                            paddingRight: 10,
                        }}
                    >
                        <div className="form-header-container-style">
                            <p className="form-tournament-title-style">
                                Create Tournament
                            </p>
                        </div>
                        <FormAntDesign.Item
                            label={
                                <p className="form-tournament-subtitle">
                                    Tournament Name
                                </p>
                            }
                            required
                        >
                            <p style={{ textAlign: "left" }}>
                                Provide a tournament name, this will start to give participants
                                insights what type of tournament they will be joining.
                            </p>
                            <Input
                                placeholder="Tournament Name"
                                value={tournamentName}
                                onChange={(e) => setTournamentName(e.target.value)}
                            />
                        </FormAntDesign.Item>
                        <FormAntDesign.Item
                            label={
                                <p className="form-tournament-subtitle">
                                    Tournament Description
                                </p>
                            }
                            required
                        >
                            <p style={{ textAlign: "left" }}>
                                Provide description about the tournament. What kind of game participants will be playing and objectives of it.
                            </p>
                            <TextArea
                                value={tournamentDescription}
                                onChange={(e) => { setTournamentDescription(e.target.value) }}
                                placeholder="Description..."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </FormAntDesign.Item>
                        <FormAntDesign.Item
                            label={
                                <p className="form-tournament-subtitle">
                                    Select game
                                </p>
                            }
                            required
                        >
                            <p style={{ textAlign: "left" }}>
                                What's the game participants will be playing?
                            </p>
                            <Select defaultValue="Wild Rift" style={{ width: "100%" }} onChange={handleGameName}>
                                <Option value="Wild Rift">Wild Rift</Option>
                                <Option value="Valorant">Valorant</Option>
                                <Option value="Dota">Dota</Option>
                            </Select>
                        </FormAntDesign.Item>
                        <FormAntDesign.Item
                            label={
                                <p className="form-tournament-subtitle">
                                    Select Tournament Format
                                </p>
                            }
                            required
                        >
                            <p style={{ textAlign: "left" }}>
                                Select the format of the tournament you're organizing
                            </p>
                            <Select defaultValue="Single Elimination" style={{ width: "100%" }} onChange={handleTournamentFormat}>
                                <Option value="single elimination">Single Elimination</Option>
                                <Option value="double elimination">Double Elimination</Option>
                                <Option value="round robin">Round Robin</Option>
                                <Option value="swiss">Swiss</Option>
                            </Select>
                        </FormAntDesign.Item>
                    </FormAntDesign>
                    <div style={{ marginTop: 30 }}>
                        <Button
                            type="primary"
                            size="middle"
                            className="btn-style"
                            loading={loading}
                            onClick={submitTournament}
                        >
                            {loading ? "Creating Tournament..." : "Create"}
                        </Button>
                    </div>
                </Drawer>
                <div>
                    <p className="title-style">About Battle Of The Fans</p>
                    <p className="subtitle-style">Battle of the Fans is an online tournament platform for various esports game. This platform is created using the Challonge API. You can create your tournament here with the game of your choice.</p>
                </div>
                <div className="tab-container-style">
                    <Tabs
                        tabBarExtraContent={
                            <Button
                                type="primary"
                                size="middle"
                                className="create-tournament-btn-style"
                                onClick={showDrawer}
                            >
                                Create Tournament
                            </Button>
                        }
                        className="tab-component-style"
                    >
                        <TabPane
                            tab="🏆 Tournaments"
                            key="1"
                            style={{
                                backgroundColor: "white",
                                height: "100vh",
                            }}
                        >
                            <List
                                grid={{
                                    gutter: 5,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 3,
                                    xl: 3,
                                    xxl: 3,
                                }}
                                itemLayout="horizontal"
                                dataSource={allTournaments}
                                renderItem={item => {
                                    return (
                                        <List.Item>
                                            <Card
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src={gameDetails.find(val => val.name === item.tournament.game_name).image_url}
                                                        className="cover-img-style "
                                                    />
                                                }
                                                hoverable
                                                onClick={() => { showTournamentModal(item.tournament) }}
                                                className="card-style"
                                            >
                                                <p><span style={{ fontWeight: 'bold' }}>Tournament: </span> {item.tournament.name}</p>
                                                <p className="card-p-style"><span className="card-span-style">Status: </span> {item.tournament.state}</p>
                                                <p className="card-p-style"><span className="card-span-style">Game: </span> {item.tournament.game_name}</p>
                                            </Card>
                                        </List.Item>
                                    )
                                }}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
};

export default TournamentScreen;
