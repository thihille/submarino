var txtLvl = 0;
var startAudio = true;

function updateScale() {var w = $(window).width(),h = $(window).height(),scaleFinal = 1,scaleX = w / 1024, scaleY = h / 660; if(scaleX < 1 && scaleY < 1){
	if(scaleX < scaleY) scaleFinal = scaleX; else scaleFinal = scaleY;}else{ if(scaleX < 1) scaleFinal = scaleX; else if(scaleY < 1) scaleFinal = scaleY;}$(".container").css({"transform":"scale("+scaleFinal+","+scaleFinal+")"});}



	//Config audio
	var 
	path = "media/audio/",
	
	musica = new Howl({
		urls: [
			path+'musica.mp3'
		],
		volume:.3,
		onend:function(){
            musica.stop().play();
        }
	});
	
	textoIntro = new Howl({
		urls: [
			path+'texto1.mp3'
		]
	});
	texto2 = new Howl({
		urls: [
			path+'texto2.mp3'
		]
	});
	texto3 = new Howl({
		urls: [
			path+'texto3.mp3'
		]
	});
	texto4 = new Howl({
		urls: [
			path+'texto4.mp3'
		]
	});
	somErro = new Howl({
		urls: [
			path+'somErro.mp3'
		]
	});
	somAcerto = new Howl({
		urls: [
			path+'somAcerto.mp3'
		]
	});

// Funções de Pop Up
function PopUpSmall(posTxt,imagem,descricao){
	var popup = $(".overlay-small");
	var popupC = $(".overlay-small .feedsmall");
	var posText = $(".overlay-small .feedsmall p");
	
	popup.find("p").html(descricao);
	popup.find("img").attr("src","img/"+imagem+".png");
	popup.fadeIn(300);
	setTimeout(function(){
		popupC.css({
			"transform":"scale(1)",
			"-moz-transform":"scale(1)",
			"-ms-transform":"scale(1)",
			"-o-transform":"scale(1)",
			"-webkit-transform":"scale(1)"
			});
		posText.css({
			marginTop:posTxt+"px"
		});
        if(startAudio){
           textoIntro.stop().play();
            startAudio = false;
        }
        
	},300);
	
}

function PopUp(tipo,imagem,descricao){
	var popup = $(".overlay-feedback");
	var popupC = $(".overlay-feedback .feedback");
	
	if(tipo == 0){
		popupC.addClass("semImg").removeClass("comImg");
		popup.find("img").hide();
		popup.find("p").text(descricao);
		popup.fadeIn(300);
		setTimeout(function(){
			popupC.css({
				"transform":"scale(1)",
				"-moz-transform":"scale(1)",
				"-ms-transform":"scale(1)",
				"-o-transform":"scale(1)",
				"-webkit-transform":"scale(1)"
				});
		},300);
	}else if(tipo == 1){
		popupC.addClass("comImg").removeClass("semImg");
		popup.find("p").text(descricao);
		popup.find("img").attr("src","img/"+imagem+".png");
		popup.fadeIn(300);
		setTimeout(function(){
			popupC.css({
				"transform":"scale(1)",
				"-moz-transform":"scale(1)",
				"-ms-transform":"scale(1)",
				"-o-transform":"scale(1)",
				"-webkit-transform":"scale(1)"
				});
		},300);
	}
}
var startGame = {
    init:function(){
$(function() {
    musica.stop().play();
	PopUpSmall(25,"imgMsgFeed","RESOLVA AS ADIÇÕES E ENCONTRE <br>OS PARES NO JOGO DA MEMÓRIA.");
	
    //textoInstrucoes: "Clique nas ostras para formar pares. Serão 3 fases para você praticar."
    
    
    
	var botaoFechaPop = $(".btnFechaPopUp");
	var botaoFechaSmall = $(".btnFechaSmall");
	var botaoFechaSmallFinaliza = $(".btnFechaSmallFinaliza");
	
	//Botão que fecha o Pop e Small
	botaoFechaSmall.on({
		click: function(){
			$(".feedsmall").css({
				"transform":"scale(0)",
				"-moz-transform":"scale(0)",
				"-ms-transform":"scale(0)",
				"-o-transform":"scale(0)",
				"-webkit-transform":"scale(0)"
			});
	       textoIntro.stop();
            texto2.stop();
            texto3.stop();
            texto4.stop();
			setTimeout(function(){
				$(".overlay-small").fadeOut(300);
				//desliga = 'play';
			},500);
		}
	});
	botaoFechaSmallFinaliza.on({
		click: function(){
			sessionStorage.setItem('recarregar', 'sim');
		}
	});
    
	var carta_r1 = '';
	var carta_r2 = '';
	var acertos = 0;
	var nErros = 1;
	var nAcertos = 1;
	$('#fase1 .carta').click(function(){
		var ele = $(this);
		var eleClass = ele.attr('class');
		var resp = ele.attr('data-resp');
		var qntVirada = $('#fase1 .carta.virada').size();
		ele.addClass('virada');
		//se tiver so 1 faz isso
		if(qntVirada==0){
			carta_r1 = resp;
		}
		var resp22 = eleClass.indexOf("virada");
		//se tiver mais de 2 encera ou se a clicada ja tiver virada
		if(qntVirada>1 || resp22 !=-1){
				 carta_r1 = '';
				 carta_r2 = '';
				voltaCarta();
		}else if(qntVirada==1){
			//se tiver 2 faz isso e encerra
			carta_r2 = resp
			if(carta_r1 == carta_r2){
                somAcerto.stop().play();
				$("#fase1 .carta[data-resp='"+resp+"']").addClass('fixa').removeClass('virada').unbind('click');
				acertos++;
                
				$("#painel .acertos").text(nAcertos++);
				
				if(acertos == 6){
					PopUpSmall(25,"imgMsgFeed","MUITO BEM! AGORA RESOLVA AS SUBTRAÇÕES PARA ENCONTRAR OS PARES.");
				    texto2.stop().play();
					fase2();
				}
			}else{
			//Erro
				carta_r1 = '';
				carta_r2 = '';
				$("#painel .erros").text(nErros++);
				somErro.stop().play();
			//da um tempo, limpa a carta errada que clicou e volta
			timeoutID = window.setTimeout("voltaCarta();", 800);
			}	
		}
	})
	$('#fase2 .carta').click(function(){
		var ele = $(this);
		var eleClass = ele.attr('class');
		var resp = ele.attr('data-resp');
		var qntVirada = $('#fase2 .carta.virada').size();
		ele.addClass('virada');
		if(qntVirada==0){
			carta_r1 = resp;
		}
		var resp22 = eleClass.indexOf("virada");
		if(qntVirada>1 || resp22 !=-1){
				 carta_r1 = '';
				 carta_r2 = '';
				voltaCarta();
		}else if(qntVirada==1){
			carta_r2 = resp
			if(carta_r1 == carta_r2){
                somAcerto.stop().play();
				$("#fase2 .carta[data-resp='"+resp+"']").addClass('fixa').removeClass('virada').unbind('click');
				acertos++;
				$("#painel .acertos").text(nAcertos++);
				if(acertos == 12){
					PopUpSmall(10,"imgMsgFeed","PARABÉNS! NO ÚLTIMO DESAFIO, RESOLVA <br>AS OPERAÇÕES, QUE ESTÃO MISTURADAS, <br>E ENCONTRE OS PARES.");
					texto3.stop().play();
					fase3();
				}
			}else{
				carta_r1 = '';
				carta_r2 = '';
				$("#painel .erros").text(nErros++);
				somErro.stop().play();
				timeoutID = window.setTimeout("voltaCarta();", 800);
			}	
		}
	})
	$('#fase3 .carta').click(function(){
		var ele = $(this);
		var eleClass = ele.attr('class');
		var resp = ele.attr('data-resp');
		var qntVirada = $('#fase3 .carta.virada').size();
		ele.addClass('virada');
		if(qntVirada==0){
			carta_r1 = resp;
		}
		var resp22 = eleClass.indexOf("virada");
		if(qntVirada>1 || resp22 !=-1){
				 carta_r1 = '';
				 carta_r2 = '';
				voltaCarta();
		}else if(qntVirada==1){
			carta_r2 = resp
			if(carta_r1 == carta_r2){
				$("#fase3 .carta[data-resp='"+resp+"']").addClass('fixa').removeClass('virada').unbind('click');
				acertos++;
				$("#painel .acertos").text(nAcertos++);
				somAcerto.stop().play();
				if(acertos == 17){
					$(".btnFechaSmall").hide();
				}else if(acertos == 18){
					PopUpSmall(10,"imgMsgFeed","EXCELENTE! VOCÊ CONSEGUIU PASSAR <br>PELAS TRÊS ETAPAS. JOGUE NOVAMENTE <br>PARA PRATICAR MAIS.");
					texto4.stop().play();

					$(".btnFechaSmallFinaliza").show();
				}
			}else{
				carta_r1 = '';
				carta_r2 = '';
				$("#painel .erros").text(nErros++);
				somErro.stop().play();
			timeoutID = window.setTimeout("voltaCarta();", 800);
			}	
		}
	})
	startCountdown();
	//tempo = 80; Setar o tempo
	//desliga = "pause"; Pausa o tempo / "play" Inicia o tempo
});
                updateScale();
    }
}

function voltaCarta(){
	$('#fase1 .carta, #fase2 .carta, #fase3 .carta').removeClass('virada')
}

function fase2(){
	$("#fase1").fadeOut(500,function(){
		$("#fase1").remove();
		$("#fase2").fadeIn(500);
	});	
}
function fase3(){
	$("#fase2").fadeOut(500,function(){
		$("#fase2").remove();
		$("#fase3").fadeIn(500);
	});	
}

var tempo = new Number();
// Tempo em segundos

tempo = 180;
var desliga = 'stop';
function startCountdown(){
if(desliga=='stop'){
	var setTm = setTimeout('startCountdown()',1000);
	return false;
	
}else if(desliga=='play'){
		// Se o tempo não for zerado
		if((tempo - 0) >= 0){
			// Pega a parte inteira dos minutos
			var min = parseInt(tempo/60);
			// Calcula os segundos restantes
			var seg = tempo%60;
			// Formata o número menor que dez, ex: 08, 07, ...
			if(min < 10){
				min = min;
				//min = min.substr(0, 2);
			}
			if(seg <=9){
				seg = "0"+seg;
			}
			if(min == 0 && seg == 10){
				$("#timer").css({color:"red"}); // COLOCAR SOM CONTAGEM REGRESSIVA
			}
			horaImprimivel =  min + ':' + seg;
			$("#timer").html(horaImprimivel);
			var setTm = setTimeout('startCountdown()',1000);
			tempo--;
			return setTm;
		} else {
			alert("Criar tela OVER");
		}
	}

}
$(window).resize(function(){
	updateScale();
});




