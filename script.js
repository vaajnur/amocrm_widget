define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
  var CustomWidget = function () {
    var self = this,
      system = self.system;
 
    self.openModal = function (data) {
        // Modal
          modal = new Modal({
          class_name: 'modal-window',
           init: function ($modal_body) {
           var $this = $(this);
           $modal_body
              .trigger('modal:loaded') //запускает отображение модального окна
              .html(data)
              .trigger('modal:centrify')  //настраивает модальное окно
              .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span>');
             },
            destroy: function () {}
         });
    }

      self.getTemplate = function (template, params, callback) {
            params = (typeof params == 'object')?params:{};
            template = template || '';
 
            return self.render({
                href:'/templates/' + template + '.twig',
                base_path:self.params.path, //тут обращение к объекту виджет вернет /widgets/#WIDGET_NAME#
                load: callback //вызов функции обратного вызова
            }, params); //параметры для шаблона
        }

     this.callbacks = {
      settings: function () {
        if (AMOCRM.lang_id == "ru") {          
          // чекбокс
          $("#sample_custom_content").html("<label><input type='checkbox' name='agreement' value='1'/>согласие с условиями передачи информации</label>").parent().show()
        }
      },
      dpSettings: function () {
      },
      init: function () {
        return true;
      },
      bind_actions: function () {
        return true;
      },
      render: function () {
        self.getTemplate('button', {}, function(data){
            $('.button-input-more .button-input__context-menu').prepend(data.render());
        });

        $(document).off('click', '#modal123');
        $(document).on('click', '#modal123', function(event) {
            event.stopPropagation();
            event.preventDefault();
            self.openModal("<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam nisi maiores omnis, aliquam qui. Accusantium, minima aliquid. Repudiandae, cum nostrum expedita voluptatibus, provident quo. Ab, suscipit, ullam! Ad, laborum at!</div>")
        });
        return true;
      },
      contacts: {
      },
      leads: {
      },
      onSave: function () { 
        return true;
      }
    };
    return this;
  };
  return CustomWidget;
});