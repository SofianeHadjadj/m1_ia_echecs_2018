// Variables d'initialisation générales

    var who = 'humain';

    var table={
        places: Array(),
        lines: Array(),
        cols: Array(),
        selected: null
    };

//  Fonction de création du plateau

    function initGrid() {

        var charac = '';
        var tableType = '';
        var cellType = '';      
            
        for(var l = 0; l < 9; l++) {
            if (l==0) {
                charac = "<br/>";
            } else {
                charac = String.fromCharCode(64+l);
            }

            if (l==0) {
                tableType = "tableCorner";
            } else {
                tableType = "tableBorder";
            }

            document.getElementById('pTable').innerHTML += "<tr id='lignette"+l+"'>"
                +"<td class='" +tableType+ "'>"
                + charac
                +"</td>";

                for(var c = 0; c < 8; c++)
                {

                if ((c+l)%2==0) {
                    cellType = "dark";
                } else {
                    cellType = "light";
                }

                    if(l>0) {
                        document.getElementById('lignette'+l).innerHTML +="<td class='tableCell " + cellType + "-cell'>"
                            +"&nbsp;"
                        +"</td>";
                    } else{
                        
                        document.getElementById('lignette'+l).innerHTML +="<td class='tableBorderTop'>"
                           + (c+1)
                        +"</td>";
                    }
                }
            document.getElementById('pTable').innerHTML += "</tr>"
        }

    }


//  Fonction d'initialisation des positions    
        
        function placePiece(){

            var loadedImages= 0;
            var imagesToLoad= 0;            

            top.gameRel= self;

            table.lines= Array();
            table.cols= Array();

            var places= document.getElementById('table').getElementsByTagName('table')[0].getElementsByTagName('tr');

            table.places= Array();
            var line= null;
            for(var i=1, j=places.length; i<j; i++)
            {
                line= places[i].getElementsByTagName('TD');
                table.places[i]= line;
                for(var k=1; k<line.length; k++)
                {
                    $(line[k]).data('ref', [i, k]).bind('click', selectPlace);
                }
            }
            
            $(table.places[1][1]).append("<img src='assets/images/tour-noire.png' width='40' class='cntrImp' color='black' piece='rook' level='3'>");
            $(table.places[1][2]).append("<img src='assets/images/cavalier-noir.png' width='40' class='cntrImp' color='black' piece='knight' level='2'>");
            $(table.places[1][3]).append("<img src='assets/images/fou-noir.png' width='40' class='cntrImp' color='black' piece='bishop' level='3'>");
            $(table.places[1][4]).append("<img src='assets/images/roi-noir.png' width='40' class='cntrImp' color='black' piece='king' level='5'>");
            $(table.places[1][5]).append("<img src='assets/images/reine-noire.png' width='40' class='cntrImp' color='black' piece='queen' level='4'>");
            $(table.places[1][6]).append("<img src='assets/images/fou-noir.png' width='40' class='cntrImp' color='black' piece='bishop' level='3'>");
            $(table.places[1][7]).append("<img src='assets/images/cavalier-noir.png' width='40' class='cntrImp' color='black' piece='knight' level='2'>");
            $(table.places[1][8]).append("<img src='assets/images/tour-noire.png' width='40' class='cntrImp' color='black' piece='rook' level='3'>");


            $(table.places[8][1]).append("<img src='assets/images/tour-blanche.png' width='40' class='cntrImp' color='white' piece='rook' level='3'>");
            $(table.places[8][2]).append("<img src='assets/images/cavalier-blanc.png' width='40' class='cntrImp' color='white' piece='knight' level='2'>");
            $(table.places[8][3]).append("<img src='assets/images/fou-blanc.png' width='40' class='cntrImp' color='white' piece='bishop' level='3'>");
            $(table.places[8][4]).append("<img src='assets/images/roi-blanc.png' width='40' class='cntrImp'   color='white' piece='king' level='5'>");
            $(table.places[8][5]).append("<img src='assets/images/reine-blanche.png' width='40' class='cntrImp' color='white' piece='queen' level='4'>");
            $(table.places[8][6]).append("<img src='assets/images/fou-blanc.png' width='40' class='cntrImp' color='white' piece='bishop' level='3'>");
            $(table.places[8][7]).append("<img src='assets/images/cavalier-blanc.png' width='40' class='cntrImp' color='white' piece='knight' level='2'>");
            $(table.places[8][8]).append("<img src='assets/images/tour-blanche.png' width='40' class='cntrImp' color='white' piece='rook' level='3'>");

            $([ table.places[7][1],
                table.places[7][2],
                table.places[7][3],
                table.places[7][4],
                table.places[7][5],
                table.places[7][6],
                table.places[7][7],
                table.places[7][8]]).append("<img src='assets/images/pion-blanc.png' class='cntrPion' color='white' piece='pawn' width='50' level='1' firstMove='true'>");

            $([ table.places[2][1],
                table.places[2][2],
                table.places[2][3],
                table.places[2][4],
                table.places[2][5],
                table.places[2][6],
                table.places[2][7],
                table.places[2][8]]).append("<img src='assets/images/pion-noir.png' class='cntrPion' color='black' piece='pawn' width='50' level='1' firstMove='true'>");
            var pieceCounter= 1;
            
            imagesToLoad= $('img');
            imagesToLoad.bind('load', function(){
                loadedImages++;
                if(imagesToLoad.length<= loadedImages)
                    $('#blocker').fadeOut();
            });
            $('#table img').each(function(){
               this.id= 'piece_'+pieceCounter;
               pieceCounter++
            });
            
        }


//  Fonction de selection d'une pièce

        function selectPlace(event){

            if(who != 'humain')
                return;

            if(this.lastChild.tagName=='IMG' && this.lastChild.getAttribute('color') == 'white') {
                getPossibilities(this.lastChild, true);
            } else{
                tryMove(false, this)
            }
        };


//  Fonction pour deselectionner la pièce

        function desSelect() {

            $(table.selected).removeClass('selectedColl');
            table.selected= null;
            $('.possibilities').removeClass('possibilities');
        }


//  Fonction d'identification des possibilités de déplacement      

        function getPossibilities(piece, show)
        {
            if(table.selected) {
                if(table.selected == piece.parentNode) {
                    desSelect();
                    return;
                }
                desSelect();
            }
            table.selected= piece.parentNode;
            if(show)
                $(table.selected).addClass("selectedColl");
            var selectedPiece= piece;
            var cur= $(table.selected).data('ref');
            var endPoint;
            var cell;
            var ret= Array();
            switch(selectedPiece.getAttribute('piece'))
            {
                case 'pawn': // Mouvement des pions

                    var curLine= cur[0] - 1;
                    var curLine2= cur[0] - 2;
                            
                    if( table.places[ curLine ] && table.places[ cur[0]-1 ][cur[1]] ) {
                    
                    cell= table.places[ curLine ][cur[1]];

                    if(cell.lastChild.tagName != 'IMG') {
                        if(show)
                            $(cell).addClass('possibilities');
                        else
                            ret.push(cell);

                        // si c'est le premier coup : possibilité d'avancer de 2 cases
                        if( selectedPiece.getAttribute('firstMove')
                            &&
                            table.places[ curLine2 ][cur[1]].lastChild.tagName != 'IMG')
                        {
                            if(show)
                                $(table.places[ curLine2 ][cur[1]]).addClass('possibilities');
                            else
                                ret.push(table.places[ curLine2 ][cur[1]]);
                        }
                    }
                    // Possibilités de manger :

                    // * À gauche
                    if(table.places[curLine] && table.places[cur[0] - 1][ cur[1] -1 ]
                       &&
                       table.places[curLine][ cur[1] -1 ].lastChild.tagName=='IMG'
                       &&
                       table.places[curLine][ cur[1] -1 ].lastChild.getAttribute('color') != 'white')
                    {
                       // alert(table.places[cur[0] - 1][ cur[1] -1 ].lastChild);
                        if(show)
                            $(table.places[curLine][ cur[1] -1 ]).addClass('possibilities');
                        else
                            ret.push(table.places[curLine][ cur[1] -1 ]);
                    }

                    // * À droite
                    if(table.places[curLine] && table.places[curLine][ cur[1] +1 ]
                       &&
                       table.places[curLine][ cur[1] +1 ].lastChild.tagName=='IMG'
                       &&
                       table.places[curLine][ cur[1] +1 ].lastChild.getAttribute('color') != 'white')
                    {
                       // alert(table.places[cur[0] - 1][ cur[1] -1 ].lastChild);
                        if(show)
                            $(table.places[curLine][ cur[1] +1 ]).addClass('possibilities');
                        else
                            ret.push(table.places[curLine][ cur[1] +1 ]);
                    }
                            }
                break;
                case 'knight': // Mouvement des cavaliers

                    var knight=[
                        [2, 1],
                        [2, -1],
                        [1, 2],
                        [1, -2],
                        [-2, 1],
                        [-2, -1],
                        [-1, 2],
                        [-1, -2]
                    ];
                    for(var i=0; i<knight.length; i++) {
                        if(table.places[ cur[0] + knight[i][0] ]
                           &&
                           table.places[ cur[0] + knight[i][0] ][ cur[1] + knight[i][1]]
                           &&
                           $(table.places[ cur[0] + knight[i][0] ][ cur[1] + knight[i][1]]).hasClass('tableCell')
                       )
                        {
                            cell= table.places[ cur[0] + knight[i][0] ][ cur[1] + knight[i][1]];
                            endPoint= cell.lastChild;
                            if(endPoint.tagName!='IMG' || endPoint.getAttribute('color')!= 'white') {
                                if(show)
                                    $(cell).addClass('possibilities');
                                else{
                                    ret.push(cell);
                                }
                            }
                        }
                    }
                break;                
                case 'rook': // Mouvements des tours (Le roi et la reine on aussi ces mouvements)
                case 'king':
                case 'queen':
                            // Mouvement croisé (+) :

                            // * Aller à gauche
                            for(var i=1; i<cur[1]; i++)
                            {
                                if(table.places[cur[0]][ cur[1]-i ]) {
                                    if(table.places[cur[0]][ cur[1]-i ].lastChild.tagName == 'IMG') {
                                        if(table.places[cur[0]][ cur[1]-i ].lastChild.getAttribute('color') != who) {
                                            if(show)
                                                $(table.places[cur[0]][ cur[1]-i ]).addClass('possibilities');
                                            else
                                                ret.push(table.places[cur[0]][ cur[1]-i ]);
                                        }
                                        break;
                                    } else{
                                        if(show)
                                            $(table.places[cur[0]][ cur[1]-i ]).addClass('possibilities');
                                        else
                                            ret.push(table.places[cur[0]][ cur[1]-i ]);
                                    }
                                }
                                if(selectedPiece.getAttribute('piece')== 'king')
                                    break;
                            }

                            // * Aller à droite
                            for(var i=cur[1]+1; i<9; i++) {
                                if(table.places[cur[0]][ i ]) {
                                    if(table.places[cur[0]][ i ].lastChild.tagName == 'IMG') {
                                        if(table.places[cur[0]][ i ].lastChild.getAttribute('color') != who) {
                                            if(show)
                                                $(table.places[cur[0]][ i ]).addClass('possibilities');
                                            else
                                                ret.push(table.places[cur[0]][ i ]);
                                        }
                                        break;
                                    } else{
                                        if(show)
                                            $(table.places[cur[0]][ i ]).addClass('possibilities');
                                        else
                                            ret.push(table.places[cur[0]][ i ]);
                                    }
                                }
                                if(selectedPiece.getAttribute('piece')== 'king')
                                    break;
                            }

                            // * Aller vers le haut
                            var going= null;
                            for(var i=cur[0]-1; i>0; i--) {
                                going= table.places[i][ cur[1] ];
                                if(going) {
                                    if(going.lastChild.tagName == 'IMG') {
                                        if(going.lastChild.getAttribute('color') != who) {
                                            if(show)
                                                $(going).addClass('possibilities');
                                            else
                                                ret.push(going);
                                        }
                                        break;
                                    } else{
                                        if(show)
                                            $(going).addClass('possibilities');
                                        else
                                            ret.push(going);
                                    }
                                }
                                if(selectedPiece.getAttribute('piece')== 'king')
                                    break;
                            }
                            
                            // * Aller vers le bas
                            for(var i=cur[0]+1; i<9; i++) {
                                going= table.places[i][ cur[1] ];
                                if(going) {
                                    if(going.lastChild.tagName == 'IMG') {
                                        if(going.lastChild.getAttribute('color') != who) {
                                            if(show)
                                                $(going).addClass('possibilities');
                                            else
                                                ret.push(going);
                                        }
                                        break;
                                    } else{
                                        if(show)
                                            $(going).addClass('possibilities');
                                        else
                                            ret.push(going);
                                    }
                                }
                                if(selectedPiece.getAttribute('piece')== 'king')
                                    break;
                            }
                case 'bishop': // Mouvement des fous (Le roi et la reine on aussi ces mouvements)
                case 'queen':
                case 'king':
                            // Mouvement croisé (X) :

                            if(selectedPiece.getAttribute('piece') == 'rook')
                               break;

                            // * Aller à gauche vers le haut
                            var c= [cur[0]-1, cur[1]-1];
                            while(table.places[c[0]] && table.places[c[0]][c[1]]) {
                                cell= table.places[c[0]][c[1]];
                                if(cell.lastChild.tagName == 'IMG') {
                                    if(cell.lastChild.getAttribute('color') != who) {
                                        if(show)
                                            $(cell).addClass('possibilities');
                                        else
                                            ret.push(cell);
                                    }
                                    break;
                                } else{
                                    if(show)
                                        $(cell).addClass('possibilities');
                                    else
                                        ret.push(cell);
                                }
                                c[0]--;
                                c[1]--;
                                if(selectedPiece.getAttribute('piece')== 'king' || c[0]<0 || c[1]<0)
                                    break;
                            }

                            // * Aller à droite vers le haut
                            c= [cur[0]-1, cur[1]+1];
                            while(table.places[c[0]] && table.places[c[0]][c[1]]) {
                                cell= table.places[c[0]][c[1]];
                                if(cell.lastChild.tagName == 'IMG') {
                                    if(cell.lastChild.getAttribute('color') != who) {
                                        if(show)
                                            $(cell).addClass('possibilities');
                                        else
                                            ret.push(cell);
                                    }
                                    break;
                                }else{
                                    if(show)
                                        $(cell).addClass('possibilities');
                                    else
                                        ret.push(cell);
                                }
                                c[0]--;
                                c[1]++;
                                if(selectedPiece.getAttribute('piece')== 'king' || c[0]<0)
                                    break;
                            }

                            // * Aller à gauche vers le bas
                            c= [cur[0]+1, cur[1]-1];
                            while(table.places[c[0]] && table.places[c[0]][c[1]]) {
                                cell= table.places[c[0]][c[1]];
                                if(cell.lastChild.tagName == 'IMG') {
                                    if(cell.lastChild.getAttribute('color') != who) {
                                        if(show)
                                            $(cell).addClass('possibilities');
                                        else
                                            ret.push(cell);
                                    }
                                    break;
                                } else{
                                    if(show)
                                        $(cell).addClass('possibilities');
                                    else
                                        ret.push(cell);
                                }
                                c[0]++;
                                c[1]--;
                                if(selectedPiece.getAttribute('piece')== 'king' || c[1]<0)
                                    break;
                            }

                            // * Aller à droite vers le bas
                            c= [cur[0]+1, cur[1]+1];
                            while(table.places[c[0]] && table.places[c[0]][c[1]]) {
                                cell= table.places[c[0]][c[1]];
                                if(cell.lastChild.tagName == 'IMG') {
                                    if(cell.lastChild.getAttribute('color') != who) {
                                        if(show)
                                            $(cell).addClass('possibilities');
                                        else
                                            ret.push(cell);
                                    }
                                    break;
                                } else{
                                    if(show)
                                        $(cell).addClass('possibilities');
                                    else
                                        ret.push(cell);
                                }
                                c[0]++;
                                c[1]++;
                                if(selectedPiece.getAttribute('piece')== 'king')
                                    break;
                            }
                        break;
            }
            if(ret.length>0)
                return ret;
        }

//  Fonction de déplacement

        function tryMove(movementData, el) {

        var pieces= Array();
        pieces['white']= 16;
        pieces['black']= 16;
        var lost= false;            

            if(!el) {
                var origMovData= movementData;
                movementData= movementData.replace('>:MovementReturn:', '').split('|');

                var where= movementData[2].split(',');
                var cell= table.places[where[0]][where[1]];
                if(cell.lastChild.tagName=='IMG') {
                    var king= false;
                    if(cell.lastChild.getAttribute('piece') == 'king')
                        king= true;

                    if(cell.lastChild.style.display!= 'none') {
                        $(cell.lastChild).fadeOut('slow', function(){
                            tryMove(origMovData);
                        });
                        return;
                    }
                    cell.removeChild(cell.lastChild);   
                }
                cell.appendChild(document.getElementById(movementData[1]))
                if(document.getElementById(movementData[1]).getAttribute('firstMove'))
                document.getElementById(movementData[1]).removeAttribute('firstMode');
                if(king) {
                    lost= true;
                }
                who= who=='humain' ? 'machine': 'humain';

            } else
                if(table.selected && table.selected.lastChild.getAttribute('color') == 'white') {
                    if($(el).hasClass('possibilities')) { 
                    // Déplacer la pièce ICI
                        if(el.lastChild.tagName=='IMG') { 
                        // manger un adversaire
                            pieces[el.lastChild.getAttribute('color')]--;
                            var king= false;
                            if(el.lastChild.getAttribute('piece') == 'king') {
                             
                                king= true;
                            }
                            if(el.lastChild.style.display!= 'none') {
                                $(el.lastChild).fadeOut('slow', function(){
                                    tryMove(false, el);
                                });
                                return;
                            }
                            el.removeChild(el.lastChild);
                        }
                        if(table.selected.lastChild.getAttribute('firstMove')) {
                            table.selected.lastChild.removeAttribute('firstMove');
                        }

                        el.appendChild(table.selected.lastChild);
                        desSelect();
                        // Transmettre le mouvement à l'adversaire
                        who= who=='humain'? 'machine': 'humain';

/*-------------------------------------------------------------------------  
|                      ICI : L'APPEL À LA FONCTION D'IA                   |
----------------------                                  -------------------
                      |                                |                
                      |         */activIA();/*
                      |                                |
----------------------                                 --------------------  
|                      ICI : L'APPEL À LA FONCTION D'IA                   |
-------------------------------------------------------------------------*/                        

                        if(king) {
                            win();
                        }

                        who = who =='humain'? 'machine': 'humain';
                    }
                }
            if(lost)
                loose();
        }

    function win() {

        alert(who + ' a perdu !');

        top.keepVerifying = false;
        who = false;
    }

    function loose() {

        alert(who + ' a gagn\u00e9 !');

        who = false;
        top.keepVerifying = false;
    }


initGrid();
placePiece();