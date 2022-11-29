import { Routes, Route } from "react-router-dom";
import LiveBackground from './LiveBackground'
import PreLiveBackground from './PreLiveBackground'
import PostLiveBackground from './PostLiveBackground'
function App() {
  return <Routes>
    <Route path="/" element={<LiveBackground />} />
    <Route path="/pre" element={<PreLiveBackground />} />
    <Route path="/post" element={<PostLiveBackground />} />
  </Routes>

}

export default App;
