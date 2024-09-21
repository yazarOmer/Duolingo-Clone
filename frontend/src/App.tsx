import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-2">
      {/* <Button>Login</Button>
      <Button variant="primary">Login</Button>
      <Button variant="primaryOutline">Login</Button> */}
      {/* <Button variant="secondary">Login</Button>
      <Button variant="secondaryOutline">Login</Button>
      <Button variant="danger">Login</Button>
      <Button variant="dangerOutline">Login</Button> */}
      <Button variant="sidebar">Login</Button>
      <Button variant="sidebarOutline">Login</Button>
      {/* <Button variant="ghost">Login</Button> */}
    </div>
  );
}

export default App;
