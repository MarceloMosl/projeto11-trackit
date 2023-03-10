import styled, { createGlobalStyle } from "styled-components";
import Login from "./pages/login";
import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Habits from "./pages/habitos";
import Hoje from "./pages/hoje";
import Historico from "./pages/historico";

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />
	<Routes>
    <Route path="/"  element={<Login/>}/>
	<Route path="/cadastro"  element={<Cadastro/>}/>
	<Route path="/habitos" element={<Habits/>}/>
	<Route path="/hoje" element={<Hoje />}/>
	<Route path="/historico" element={<Historico />} />
	</Routes>
    </BrowserRouter>
  );
}

export default App;

const GlobalStyle = createGlobalStyle` 

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


`
