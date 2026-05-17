/* Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AnnotationEditorParamsType } from "pdfjs-lib";

class AnnotationEditorParams {
  /**
   * @param {AnnotationEditorParamsOptions} options
   * @param {EventBus} eventBus
   */
  constructor(options, eventBus) {
    this.eventBus = eventBus;
    this.#bindListeners(options);
  }

  #bindListeners({
    editorStampAddImage,
  }) {
    const dispatchEvent = (typeStr, value) => {
      this.eventBus.dispatch("switchannotationeditorparams", {
        source: this,
        type: AnnotationEditorParamsType[typeStr],
        value,
      });
    };

    if (editorStampAddImage) {
      editorStampAddImage.addEventListener("click", () => {
        dispatchEvent("CREATE");
      });
    }

    this.eventBus._on("annotationeditorparamschanged", evt => {
      // No longer need to update free text or ink editors.
    });
  }
}

export { AnnotationEditorParams };
