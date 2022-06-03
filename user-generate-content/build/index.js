/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/module/MyNotes.js":
/*!*******************************!*\
  !*** ./src/module/MyNotes.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on('click', '.delete-note', this.deleteNote);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on('click', '.edit-note', this.editNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#my-notes").on('click', '.update-note', this.updateNote.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.submit-note').on('click', this.createNote.bind(this));
  } // Method


  editNote(e) {
    let thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("div");

    if (thisNote.data("state") === "editable") {
      this.makeNoteReadOnly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }

  makeNoteEditable(thisNote) {
    thisNote.find('.edit-note').html('Cancel');
    thisNote.find('.input-data').removeAttr('readonly').addClass('note-active');
    thisNote.find('.update-note').css('display', 'inline');
    thisNote.data("state", "editable");
  }

  makeNoteReadOnly(thisNote) {
    thisNote.find('.edit-note').html('Edit');
    thisNote.find('.input-data').attr('readonly', 'readonly').removeClass('note-active');
    thisNote.find('.update-note').css('display', 'hidden');
    thisNote.data("state", "cancel");
  }

  deleteNote(e) {
    let thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("div");
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce);
      },
      url: wplainData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'DELETE',
      success: response => {
        thisNote.slideUp();
        console.log("congrats");
        console.log(response);

        if (response.userNoteCount <= 2) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".note-limit").css('display', 'none');
        }
      },
      error: response => {
        console.log("Sorry");
        console.log(response);
      }
    });
  }

  updateNote(e) {
    let thisNote = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents("div");
    let ourUpdatedPost = {
      'title': thisNote.find(".title-field").val(),
      'content': thisNote.find(".body-field").val()
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce);
      },
      url: wplainData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type: 'POST',
      data: ourUpdatedPost,
      success: response => {
        this.makeNoteReadOnly(thisNote);
        console.log("congrats");
        console.log(response);
      },
      error: response => {
        console.log("Sorry");
        console.log(response);
      }
    });
  }

  createNote() {
    let ourNewPost = {
      'title': jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-title").val(),
      'content': jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-body").val(),
      'status': 'private'
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-NONCE', wplainData.nonce);
      },
      url: wplainData.root_url + '/wp-json/wp/v2/note/',
      type: 'POST',
      data: ourNewPost,
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".new-note-title, .new-note-body").val('');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`
                <div data-id="${response.id}">
                        <label>
                            <input readonly class="input-data title-field" value="${response.title.raw}">
                        </label>
                        <label>
                            <textarea class="input-data body-field" readonly> ${response.content.raw}</textarea>
                        </label>
                        <button class="edit-note">Edit</button>
                        <button style="display: none" class="update-note">Save</button>
                        <button class="delete-note">Delete</button>
                 </div>
                `).prependTo("#my-notes").hide().slideDown();
        console.log("Congrats");
        console.log(response);
      },
      error: response => {
        if (response.responseText == "You have reached your notes limit") {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".note-limit").css('display', 'inline');
        }

        console.log("Sorry");
        console.log(response);
      }
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MyNotes);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_MyNotes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/MyNotes */ "./src/module/MyNotes.js");

const myNotes = new _module_MyNotes__WEBPACK_IMPORTED_MODULE_0__["default"]();
}();
/******/ })()
;
//# sourceMappingURL=index.js.map