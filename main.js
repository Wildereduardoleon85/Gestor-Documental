$(document).ready(()=>{
    $.getJSON('datos.json', (data)=> {
        let clientes = data;
        
        $('#formulario').submit((e)=>{
            e.preventDefault();
            const busqueda = $('#busqueda').val();

            const resultado = clientes.filter((item)=>{
                return (item.rut === busqueda);
            });

            if (Object.keys(resultado).length>=1){
                
                $('#cliente').text(resultado[0].nombres + ' ' + resultado[0].apellidos);

                $.each(resultado, function (index, item) { 
                    let documentos = item.documentos;
                    $('#validacion').css( 'visibility', 'hidden');
                    $('#contenedor').html('');
                    $.each(documentos, function(index, item){
                        $('#contenedor').html($('#contenedor').html()+`
        
                        <div class="caja">
                            <img src="img/PDF.svg" alt="">
                            <a href="${item}" target="_blank">Ver ${index}</a>
                            <a href="${item}" download>Descargar</a>
                        </div> 
                        
                        `);
                    })
                });
            }else{
                $('#validacion').css( 'visibility', 'visible');
            }
        })
        
        }).fail(()=> {
            console.log('Error al leer archivo JSON');
        });
})