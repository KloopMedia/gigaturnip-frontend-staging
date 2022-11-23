import AudioType from "./AudioType";
import AutoCompleteType from "./AutoCompleteType";
import CustomFileType from "./CustomFileType";
import CustomLinkType from "./CustomLinkType";
import CounterType from "./CounterType"
import CustomLongAnswerType from './CustomLongAnswerType'
import CardType from "./CardType";
import ReaderType from "./ReaderType";
import RichText from "./RichTextType";
import ShortAnswerInput from "./CustomShortAnswerType";
import SimpleAutoCompleteInput from "./SimpleAutoComplete";

export {
    AudioType,
    AutoCompleteType,
    CustomFileType,
    CustomLinkType,
    CounterType,
    CustomLongAnswerType,
    CardType,
    ReaderType,
    RichText,
    ShortAnswerInput,
    SimpleAutoCompleteInput
}

export default {
    ...AudioType,
    ...AutoCompleteType,
    ...CustomFileType,
    ...CustomLinkType,
    ...CounterType,
    ...CustomLongAnswerType,
    ...CardType,
    ...ReaderType,
    ...RichText,
    ...ShortAnswerInput,
    ...SimpleAutoCompleteInput,
}