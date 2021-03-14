function mediaClass() {
   let maxWidthContainer = 1170;
   let md1 = maxWidthContainer + 12;
   let md2 = 991.98;
   let md3 = 767.98;
   let md4 = 479.98;

   let md0Min = window.matchMedia('(min-width:' + md1 + 'px)');
   let md1Max = window.matchMedia('(max-width:' + md1 + 'px)');
   let md1Min = window.matchMedia('(min-width:' + md2 + 'px)');
   let md2Max = window.matchMedia('(max-width:' + md2 + 'px)');
   let md2Min = window.matchMedia('(min-width:' + md3 + 'px)');
   let md3Max = window.matchMedia('(max-width:' + md3 + 'px)');
   let md3Min = window.matchMedia('(min-width:' + md4 + 'px)');
   let md4Max = window.matchMedia('(max-width:' + md4 + 'px)');


   function mdFunc0() {
      if (md0Min.matches) {
         document.querySelector('body').classList.add('_md');
      } else {
         document.querySelector('body').classList.remove('_md')
      }
   }

   function mdFunc1() {
      if (md1Max.matches && md1Min.matches) {
         document.querySelector('body').classList.add('_md1');
      } else {
         document.querySelector('body').classList.remove('_md1')
      }
   }

   function mdFunc2() {
      if (md2Max.matches && md2Min.matches) {
         document.querySelector('body').classList.add('_md2');
      } else {
         document.querySelector('body').classList.remove('_md2')
      }
   }

   function mdFunc3() {
      if (md3Max.matches && md3Min.matches) {
         document.querySelector('body').classList.add('_md3');
      } else {
         document.querySelector('body').classList.remove('_md3')
      }
   }

   function mdFunc4() {
      if (md4Max.matches) {
         document.querySelector('body').classList.add('_md4');
      } else {
         document.querySelector('body').classList.remove('_md4')
      }
   }

   mdFunc0();
   mdFunc1();
   mdFunc2();
   mdFunc3();
   mdFunc4();

   md0Min.addListener(mdFunc0);
   md1Max.addListener(mdFunc1);
   md1Min.addListener(mdFunc1);
   md2Max.addListener(mdFunc2);
   md2Min.addListener(mdFunc2);
   md3Max.addListener(mdFunc3);
   md3Min.addListener(mdFunc3);
   md4Max.addListener(mdFunc4);

}

mediaClass();