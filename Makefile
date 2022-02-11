up:
	docker-compose up -d

down: 
	docker-compose down

restart:
	@make down
	@make up

ps:
	docker-compose ps

logs:
	docker-compose logs

yarn:
	yarn && cd frontend && yarn && cd ../backend && yarn

cp:
	yarn gulp

build:
	docker-compose build --no-cache

api:
	docker-compose exec api sh