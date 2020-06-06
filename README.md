# Session de formation Diginamic du 27 mai 2020 au 7 juillet 2020

Arborescensse des dossier obtenus à l'aide du fichier Arbres.bat(pour windows)
Une solution équivalente existe sous linux je l'ajoute dès que je la retrouve.

Par soucis de lisibilité j'ai retiré le dossier bootstrap.
Il contient un troisième projet basé sur memopous réalisé avec bootstrap.
````
+---html    //Contient le premier projet HTML avec un formulaire 
|       formhotel.html
|       index.html
|       test.html
|       
\---html-css //Second projet qui c'est effectué en deux temps, une première partie avec les techniques de css classique
    +---css // Une seconde partie avec les techniques de flexbox 
    |       memo.css
    |       memoflex.css
    |       memoflexsass.css
    |       memoflexsass.css.map
    |       reset.css
    |       reset.css.map
    |       reset.scss
    |       test.css
    |       test.css.map
    |       variables.css
    |       variables.css.map
    |       
    +---html
    |       memo.html
    |       memoflex.html
    |       memoflexsass.html
    |       testsass.html
    |       
    +---images
    |       logomemo.svg
    |       
    \---sass            //Nécéssite l'installation de sass sur votre machine(L'exetension live sass compiler sous vscode )
            global.scss //Sinon il est possible d'installer ruby et via le gestionnaire de paquet gem d'installer sass
            header.scss
            memoflexsass.scss
            test.scss
            variables.scss
```