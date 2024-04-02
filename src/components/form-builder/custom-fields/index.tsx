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
import WebhookTriggerType from "./WebhookTrigger";
import ParagraphType from "./ParagraphType";
import ImageType from "./ImageType";
import YouTubeType from "./YoutubeRadioType";

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
    SimpleAutoCompleteInput,
    WebhookTriggerType,
    ParagraphType,
    ImageType,
    YouTubeType
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
    ...WebhookTriggerType,
    ...ParagraphType,
    ...ImageType,
    ...YouTubeType,
}