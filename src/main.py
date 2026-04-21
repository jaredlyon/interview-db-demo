from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import requests

app = FastAPI()

HTML_TEMPLATE = """
<html>
<head><title>Team Info</title></head>
<body>
	<h1>Team Information</h1>
	{error}
	<ul>
	{team_list}
	</ul>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
	error = ""
	team_list = ""
	try:
		resp = requests.get("http://localhost:3301/api/team")
		resp.raise_for_status()
		data = resp.json()
		team = data if isinstance(data, list) else [data]
		for member in team:
			team_list += f"<li>{member}</li>"
	except Exception as e:
		error = f"<p style='color:red;'>Error: {str(e)}</p>"
	return HTML_TEMPLATE.format(error=error, team_list=team_list)

# To run: uvicorn main:app --reload
