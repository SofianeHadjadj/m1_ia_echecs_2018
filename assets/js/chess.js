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
            
        };


initGrid();
placePiece();