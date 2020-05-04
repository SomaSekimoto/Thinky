// Import Packages
import React from "react"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import axios from "axios"

// Import Styles
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Grow from "@material-ui/core/Grow"
import Paper from "@material-ui/core/Paper"
import Popper from "@material-ui/core/Popper"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import chatStyles from "../styles/ChatPage.module.scss"

// Import Components

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#303030",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },

  button: {
    marginRight: theme.spacing(1),
  },
  shareCheck: {
    margin: "0 0 0 2rem",
    // position: "absolute",
    // right: "2rem",
  },
}))

export default function ChatHeader(props) {
  const classes = useStyles()

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
  const isTabletOrLaptop = useMediaQuery({ query: "(min-width: 767px)" })

  const [open, setOpen] = React.useState(false)
  const [checkShare, setCheckShare] = React.useState(true)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  function isShare(e, props) {
    // みんなに共有するかのチェックボックス用
    const share = checkShare ? false : true
    axios
      .patch(`http://localhost:3001/whies/${props.whyId}`, {
        share,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
    setCheckShare(e.target.checked)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          {isTabletOrLaptop &&
            (props.user.id ? (
              <>
                <div className={chatStyles.chatHeader}>
                  <div className={chatStyles.topicSpace}>
                    <p className={chatStyles.topic}>Why：{props.whyContent}</p>
                    <div className={chatStyles.subContainer}>
                      {props.pv === true && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkShare}
                              onChange={(e) => isShare(e, props)}
                              name="checkShare"
                              color="primary"
                            />
                          }
                          label="共有"
                          styles={classes.shareCheck}
                        />
                      )}
                      <Button color="inherit" className={classes.button}>
                        {props.user.username ? (
                          <Link to="/mypage" className={classes.link}>
                            {props.user.username}
                          </Link>
                        ) : (
                          <Link to="/mypage" className={classes.link}>
                            No Name
                          </Link>
                        )}
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => props.handleLogoutClick()}
                        className={classes.button}
                      >
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={chatStyles.chatHeader}>
                  <div className={chatStyles.topicSpace}>
                    <p className={chatStyles.topic}>Why：{props.whyContent}</p>
                    <div className={chatStyles.subContainer}>
                      <Button color="inherit" className={classes.button}>
                        <Link to="/signin" className={classes.link}>
                          Log in
                        </Link>
                      </Button>

                      <Button color="inherit" className={classes.button}>
                        <Link to="/signup" className={classes.link}>
                          Sign up
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ))}

          {isMobile &&
            (props.user.id ? (
              <>
                <div className={chatStyles.chatHeader}>
                  <div className={chatStyles.topicSpace}>
                    <p className={chatStyles.topic}>Why：{props.whyContent}</p>
                    <div className={chatStyles.subContainer}>
                      {props.pv === true && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkShare}
                              onChange={(e) => isShare(e, props)}
                              name="checkShare"
                              color="primary"
                            />
                          }
                          label="共有"
                          styles={classes.shareCheck}
                        />
                      )}
                      <Button color="inherit" className={classes.button}>
                        {props.user.username ? (
                          <Link to="/mypage" className={classes.link}>
                            {props.user.username}
                          </Link>
                        ) : (
                          <Link to="/mypage" className={classes.link}>
                            No Name
                          </Link>
                        )}
                      </Button>
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="menu-list-grow"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <MenuItem onClick={handleClose}>
                                    <Link to="/home" className={classes.link}>
                                      home
                                    </Link>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => props.handleLogoutClick()}
                                  >
                                    Log out
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={chatStyles.chatHeader}>
                  <div className={chatStyles.topicSpace}>
                    <p className={chatStyles.topic}>Why：{props.whyContent}</p>
                    <div className={chatStyles.subContainer}>
                      <Button color="inherit" className={classes.button}>
                        <Link to="/signin" className={classes.link}>
                          Log in
                        </Link>
                      </Button>

                      <Button color="inherit" className={classes.button}>
                        <Link to="/signup" className={classes.link}>
                          Sign up
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </Toolbar>
      </AppBar>
    </div>
  )
}
