.fat-b::before, .fat-a::after,
.fal-b::before, .fal-a::after,
.far-b::before, .far-a::after,
.fas-b::before, .fas-a::after {
  content:'\f2b4';
  display:inline-block;
  text-rendering:auto;
  -webkit-font-smoothing:antialiased;
}
.fat-b::before, .fat-a::after {font-family:var(--fa-font-thin);}
.fal-b::before, .fal-a::after {font-family:var(--fa-font-light);}
.far-b::before, .far-a::after {font-family:var(--fa-font-regular);}
.fas-b::before, .fas-a::after {font-family:var(--fa-font-solid);}
*.contain > * {
  max-width:var(--container-max);
  margin-right:auto;
  margin-left:auto;
}
body {
  margin:0;
  font-family:"Inter", sans-serif;
  font-optical-sizing:auto;
  font-style:normal;
}
h1, h2, h3, h4, h5, h6, .display-font {
  font-family:"Heebo", sans-serif;
  font-optical-sizing:auto;
  font-weight:900;
  font-style:normal;
}
strong.highlight {color:var(--highlight);}
a {text-decoration:none;}
.links a {
  color:var(--text-primary);
  display:block;
  font-weight:bold;
}
a.trailing-arrow:hover::after {
  padding-left:8px;
  padding-right:0;
}
a.trailing-arrow::after {
  content:'\f061';
  color:var(--highlight);
  padding-left:0;
  padding-right:8px;
  transition:all ease 70ms;
}
