1 - Copiar conteudo para machine_experiental (no branch pretendido)

2 - Copiar .ssh folder para ter acesso aos requirements (guia para criar ssh key: https://help.github.com/articles/connecting-to-github-with-ssh/)

3 - Executar na pasta machine_experiential "docker-compose build"

4 - Executar "docker-compose up", na primeira vez como esta ainda a configurar tudo é capaz de nao correr bem, esperar que acabe de configurar e de seguida terminar tudo com "ctrl-c" e correr de novo com "docker-compose up"

5 - apos uns 15 segundos é possivel aceder ao site "localhost:8000" e ao admin com o login:rafa, pass:rafa (pode-se mudar o login no supervisord.conf)

