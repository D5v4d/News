import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styleNews from "../scss/News.module.scss";
import { Button } from "antd";
import { InfoOutlined } from "@ant-design/icons";
import website from "../assets/svg/website.svg";
import france from "../assets/svg/france.svg";
import language from "../assets/svg/language.svg";
import author from "../assets/svg/author.svg";
import { IData_SnippetNews, IData_TagItem } from "../types/IData";

const formatDate = (isoDate: string | number | Date) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).replace(/ /g, " ");
};

interface IContentInfoProps {
  dataState: IData_SnippetNews;
  showLanguage?: boolean;
}

const ContentInfo: React.FC<IContentInfoProps> = ({ dataState, showLanguage = true }) => (
  <div className={styleNews.ContentInfo}>
    <span>
      <img src={website} className={styleNews.WebsitesSvg} />
      <a href={`https://${dataState.DOM}`}>{dataState.DOM}</a>
    </span>
    <span>
      <img src={france} alt="country" className={styleNews.FranceSvg} />
      {dataState.CNTR}
    </span>
    {showLanguage && (
      <span>
        <img src={language} alt="lang" className={styleNews.LanguageSvg} />
        {dataState.LANG}
      </span>
    )}
    <span>
      <img src={author} alt="authors" className={styleNews.AuthorSvg} />
      {dataState.AU.slice(0, 2).map((e: string) => ( `${e}, `))}
      {dataState.AU.length > 2 && <span> et all</span>}
    </span>
  </div>
);

interface ITagsProps {
  tags: IData_TagItem[];
}

const Tags: React.FC<ITagsProps> = ({ tags }) => (
  <div className={styleNews.Tags}>
    {tags.slice(0, 3).map((tag, index) => (
      <span key={index} className={styleNews.Tag}>
        {tag.value} <span className={styleNews.Count}>{tag.count}</span>
      </span>
    ))}
    {tags.length > 3 && (
      <button className={styleNews.SeeAll}>See All +{tags.length - 3}</button>
    )}
  </div>
);

const News = () => {
  const dataState: IData_SnippetNews = useSelector((state: RootState) => state.news);
  const formattedDate = formatDate(dataState.DP);

  return (
    <div className={styleNews.News}>
      <div className={styleNews.Header}>
        <div className={styleNews.Info}>
          {formattedDate.split(" ").map((part, index) =>
            index === 0 ? (
              <span key={index} className={styleNews.day}>
                {part}
              </span>
            ) : (
              <span key={index}> {part}</span>
            )
          )}
          <span className={styleNews.reach}>
            <span className={styleNews.achieved}>211K</span> Reach
          </span>
          <div className={styleNews.Traffic}>
            <span>Top Traffic: </span>
            {dataState.TRAFFIC.map((value, index: number) => (
              <span key={index}>
                {value.value} <span className={styleNews.count}> {value.count} </span>
              </span>
            ))}
          </div>
        </div>
        <div className={styleNews.Actions}>
          <Button
            type="primary"
            danger
            style={{ backgroundColor: "#48cc7a", color: "rgb(0 0 0)", height: "24px" }}
          >
            Primary
          </Button>
          <button className={styleNews.InfoOutlined}>
            <InfoOutlined style={{ color: "white" }} />
          </button>
          <button className={styleNews.Square}></button>
        </div>
      </div>

      {/* Title and Highlights */}
      <h2 className={styleNews.Title}>
        <a href={dataState.URL}>{dataState.TI}</a>
      </h2>
      <ContentInfo dataState={dataState} />
      <p className={styleNews.Highlights}>
        {dataState.HIGHLIGHTS.flatMap((highlight: string, index: number) =>
          highlight.split(/(<kw>|<\/kw>)/).map((part, i) => {
            if (part === "<kw>" || part === "</kw>") return null;
            const isHighlighted = highlight.split(/(<kw>|<\/kw>)/)[i - 1] === "<kw>";
            return isHighlighted ? (
              <span key={`${index}-${i}`} className={styleNews.UniqueText}>
                {part}
              </span>
            ) : (
              part
            );
          })
        )}
      </p>
      <button className={styleNews.ShowMore}>Show more ▼</button>

      {/* Tags */}
      <Tags tags={dataState.KW} />

      {/* Additional Info */}
      <div className={styleNews.AdditionalInfo}>
        <button className={styleNews.OriginalSource}>Original Source</button>
        <div className={styleNews.Duplicates}>
          <span>
            Duplicates: <span className={styleNews.DuplicatesNumber}>{dataState.REACH}</span>
          </span>
          <button>By Relevance <span>▼</span></button>
        </div>
      </div>

      {/* Duplicate Details */}
      <div className={styleNews.Ddetails}>
        <div className={styleNews.Iinfo}>
          <div>
            <span>{formattedDate}</span>
            <span className={styleNews.achieved}>211K Top Reach</span>
          </div>
          <div className={styleNews.Actions}>
            <button className={styleNews.InfoOutlined}>
              <InfoOutlined style={{ color: "white" }} />
            </button>
            <button className={styleNews.Square}></button>
          </div>
        </div>
        <h2 className={styleNews.Title}>
          <a href={dataState.URL}>{dataState.TI}</a>
        </h2>
        <ContentInfo dataState={dataState} showLanguage={false} />
      </div>

      <button className={styleNews.ViewDuplicates}>▼ View Duplicates</button>
    </div>
  );
};

export default News;