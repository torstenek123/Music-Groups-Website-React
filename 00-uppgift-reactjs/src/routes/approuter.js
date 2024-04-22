import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import {MusicGroupsWebApi, MusicGroupsWebApiList, MusicGroupsWebApiDetails} from '../pages/music-groups-webapi'

export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums-webapi" element={<MusicGroupsWebApi />}>
        <Route index element = {<MusicGroupsWebApiList/>} />
        <Route path="page/:pageNr" element= {<MusicGroupsWebApiList/>} />
        <Route path=":id" element= {<MusicGroupsWebApiDetails/>} />
        </Route>
    </Routes>
  )
}

export default AppRouter