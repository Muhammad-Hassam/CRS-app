var url = window.location.href.split(":");
if (url[0] === "https") {
  url = "https://crs-system.herokuapp.com";
} else {
  url = "http://localhost:4000";
}
export default url;
