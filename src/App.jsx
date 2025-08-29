import Canvas from "./components/Canva/index.jsx";
import Header from "./components/Header/index.jsx";
import Sidebar from "./components/Sidebar/index.js";

const dummyJson = [
  {
    id: "1",
    type: "text",
    x: 100,
    y: 100,
    rotation: 45,
    width: 100,
    height: 50,
    background: "red",
  },
  {
    id: "2",
    type: "rectangle",
    x: 200,
    y: 200,
    rotation: 45,
    width: 100,
    height: 50,
    background: "red",
  },
];
const App = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1">
        <Sidebar />
        <Canvas />
      </main>
    </div>
  );
};

export default App;
