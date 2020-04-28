// Import Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"

// Import Styles
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
// import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import EveryoneWhyStyle from "../styles/EveryoneWhy.module.scss"

// Import Components
import WhiesList from "./WhiesList"

function EveryoneWhy() {
  const classes = useStyles()
  const [genreId, setGenreId] = useState(``)

  const [text, setText] = useState("")

  const [user, setUser] = useState()

  const [whies, setWhies] = useState([])
  useEffect(() => {
    getPostsData()
  }, [])

  function getPostsData() {
    axios
      .get("http://localhost:3001/whies/index")
      .then((response) => {
        console.log(response)
        setWhies(response.data)
      })
      .catch((error) => {
        console.log("通信に失敗しました", `Error messgae:${error}`)
      })
  }

  return (
    <>
      <div className={EveryoneWhyStyle.top}>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              ジャンルを選択
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={genreId}
              onChange={(event) => {
                setGenreId(event.target.value)
              }}
              label="ジャンルを選択"
              style={selectStyle}
            >
              <MenuItem value={``}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>自然</MenuItem>
              <MenuItem value={2}>科学</MenuItem>
              <MenuItem value={3}>自己</MenuItem>
              <MenuItem value={4}>食物</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={EveryoneWhyStyle.search}>
          <input
            className={EveryoneWhyStyle.box}
            onChange={(event) => {
              setText(event.target.value)
            }}
            value={text}
            required
          ></input>
          <div className={EveryoneWhyStyle.btn}>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              style={btnStyle}
            >
              検索
            </Button>
          </div>
        </div>
      </div>
      <div className={EveryoneWhyStyle.main}>
        <WhiesList whiesData={whies} text={text} genreId={genreId} />
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const selectStyle = {
  width: "30vh",
}

const btnStyle = {
  height: "50px",
  width: "100px",
}

export default withRouter(EveryoneWhy)
