import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router, {mainRoutes} from "./routers/main-router"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {RecoilRoot} from 'recoil';

function renderRoutes(routesObj){

  return routesObj.map((route) => {
    if(route.children){
      return (
        <Route key={route.path} path={route.path} index={route.index} element={route.element}>
          {route.children ? renderRoutes(route.children) : null}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} index={route.index} element={route.element} />;
  });
}

function App(){
  return (
    <div className='min-vh-100'>
      <RecoilRoot>
        <BrowserRouter>
          <Routes> {renderRoutes(mainRoutes)}</Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}



//function App() {
  // return (
  //   <div className='min-vh-100'>
  //     <RouterProvider router = {mainRouter}/>
  //   </div>
  // )           
//}

export default App;
