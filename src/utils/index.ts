import { Parameters } from "../types";

export function processResponse(
  selectedModel: string,
  selectedMode: string,
  answer: string
) {
  // if (
  //   ["NorGPT23B-gen", "NorGPT3B-finetuned"].some((model) =>
  //     selectedModel.includes(model)
  //   ) &&
  //   selectedMode === "generation"
  // ) {
  //   const separatorIndex = answer.indexOf(": ");
  //   if (separatorIndex !== -1) {
  //     answer = answer.substring(separatorIndex + 2);
  //   }
  // }

  if (selectedMode === "summarization") {
    const separatorIndex = answer.lastIndexOf("|||\\n");
    if (separatorIndex !== -1) {
      answer = answer.substring(separatorIndex + 5);
    }
  }

  return answer;
}

export function createPostParameters(
  parameters: Parameters,
  extraLength: number
) {
  const postParameters: Parameters = {};
  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== null) {
      if (Array.isArray(value)) {
        const innermostArray = getInnermostArray(value);
        if (innermostArray.length !== 0) {
          postParameters[key] = value;
        }
      } else {
        postParameters[key] = value;
      }
    }
  });

  if ("max_length" in postParameters) {
    postParameters.max_length += extraLength;
  }

  return postParameters;
}

export function getInnermostArray(arr: any[]): any[] {
  if (Array.isArray(arr[0])) {
    return getInnermostArray(arr[0]);
  }
  return arr;
}

export function setNestedArray(
  originalArray: any[],
  innermostArray: any[]
): any[] {
  if (Array.isArray(originalArray[0])) {
    return [setNestedArray(originalArray[0], innermostArray)];
  }
  return innermostArray;
}
