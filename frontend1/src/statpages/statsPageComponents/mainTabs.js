import React, { useState, useContext } from "react";
import { ThemeContext, } from "../../context";
import { withStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from "../tabs/customTabs";
import TopStats from "./topStats";
import OverallStatsTable from "./overallStatsTable.js";
import AllTankStats from "./allTankStats";
import Charts from "./charts";
import SessionsLogParent from "./sessions/sessionsLogParent";
import { Helmet } from "react-helmet";
import ScriptTag from "react-script-tag";

export default function MainTabs(props) {
    const { theme } = useContext(ThemeContext);
    const [ value, setValue ] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const CustomTabs = withStyles({
        root: {
            elevation: 10,
            // backgroundColor: "rgb(76, 90, 166)",               
            // color: {theme === "dark" ? "white" : "black"},

            borderBottom: `1px solid ${theme === "dark" ? 'rgb(200, 200, 200)' : 'rgb(57, 82, 150)'}`,
        },
        indicator: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme === "dark" ? 'rgb(200, 200, 200)' : 'rgb(57, 82, 150)',
        },
    })(Tabs);
    
    const CustomTab = withStyles((t) => ({
        root: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginRight: t.spacing(4),
            fontFamily: "Segoe UI, Futura",
            color: theme === "dark" ? "rgb(240, 240, 240)" : "black",
            '&:hover': {
                color: theme === "dark" ? 'rgb(142, 147, 245)' : 'rgb(113, 106, 230)',
                opacity: 1,
            },
            '&$selected': {
                color: theme === "dark" ? 'rgb(191, 185, 250)' : 'rgb(78, 71, 186)',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    return(
        <>
            <div style={{ padding: "1em 0em 0.5em 0em" }}>
                <TopStats
                    username={props.username}
                    WGRating={props.WGRating}
                    data={props.graphData}
                    stats={props.stats}
                    clanStats={props.clanStats}
                    accountCreationDate={props.accountCreationDate}
                    lastPlayedTime={props.lastPlayedTime}
                />
            </div>
            <CustomTabs
                value={value}
                indicatorColor="primary"
                styles={{backgroundColor: "rgb(76, 90, 166)"}}
                onChange={handleChange}
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
            >
                <CustomTab label="MAIN STATS" />
                <CustomTab label="INFOGRAPHICS" />
                <CustomTab label="SESSIONS" />
                <CustomTab label="ACHIEVEMENTS (Coming Soon™)" />
            </CustomTabs>
            <TabPanel value={value} index={0}>
                <div style={{ margin: "1rem 0" }}>
                    <OverallStatsTable data={props.graphData.overallStats} />
                </div>
                <div style={{ padding: "0rem" }}>
                    <AllTankStats
                        overall={props.recentStats.overallStats.tankWN8}
                        recents={props.recentStats.recents}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{ marginTop: "1rem", minHeight: "300px" }}>
                    <Charts
                        data={props.graphData}
                        clanData={props.clanHistory}
                        currentClan={props.clanStats}
                        stats={props.stats}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div style={{ marginTop: "1rem", minHeight: "300px" }}>
                    <SessionsLogParent data={props.recentStats.sessions} />
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div>
                    <Helmet>
                        <script src="//ap.lijit.com/www/delivery/fpi.js?z=846403&width=160&height=600" type="text/javascript"></script>
                        <script src="//ap.lijit.com/www/delivery/fpi.js?z=846403&width=160&height=600"></script> 
                    </Helmet>
                </div>
                <div>
                    <ScriptTag type="text/javascript" src="//ap.lijit.com/www/delivery/fpi.js?z=846403&width=160&height=600" />
                </div>
            </TabPanel>
        </>
    );
}
