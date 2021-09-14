run: 
	docker-compose up -d mongo
	cd client && pm2 start --name client npm -- start
	cd server && pm2 start --name server npm -- start

stop:
	docker-compose stop mongo
	pm2 stop client
	pm2 stop server

down: 
	docker-compose down
	pm2 delete client
	pm2 delete server
	docker-compose down mongo

restart:
	docker-compose restart mongo
	pm2 restart client
	pm2 restart server

monit: 
	pm2 monit