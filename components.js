const blogPost = {
  id: 1,
  header: "Обзор YOGA 910",
  date: "2017-08-03T15:25:43.511Z",
  body:
    '<p>Мы существенно упростили форму и уменьшили нагруженность ноутбука Lenovo Yoga 920 (13") визуальными элементами, чтобы сделать его корпус еще тоньше. Полированный алюминиевый корпус выглядит одновременно и прочным, и элегантным. Доступно несколько вариантов цветового исполнения: медный, бронзовый и платиновый.</p><p>Уникальная поворотная конструкция по типу часового браслета позволяет в любой момент выбрать удобное положение экрана ноутбука Lenovo Yoga 920 (13&quot;). Шарнирное соединение отличается достаточным сопротивлением, чтобы надежно фиксировать экран в нужном положении.</p>',
  tags: [
    { id: 1, name: "Обзоры", color: "#ffc800" },
    { id: 2, name: "YOGA", color: "#9b59b6" },
    { id: 3, name: "Возможности", color: "#828700" }
  ]
};
const commentList = [
  {
    id: 1,
    author: "Сергей Мальцев",
    body:
      "Купил в прошлом году. Было много сомнений насчет процессора AMD, но все они развеялись при первом боевом крещении. Не виснет при выполнении нескольких задач, даже в Сони Вегасе при рендеринге, браузер работает как часы. ЮСБ работает заметно быстрее, только жаль, что разъема только два и все они с одной стороны."
  },
  {
    id: 2,
    author: "Анатолий Кардаш",
    body:
      "Первый раз пришел с нерабочей батареей, сервис оперативно отреагировал и предложил 2 варианта: вернуть деньги либо заменить на новый. Я выбрал новый, выслали такую же модель, но и та спустя неделю работы перестала видеть собственный жесткий диск. Настоятельно не рекомендую данный ноутбук."
  }
];

class BlogBox extends React.Component {
  render() {
    const blogDate = new Date(blogPost.date);
    const tags = this._getTags();
    return (
      <div className="blog">
        <h2 className="blog-header">{blogPost.header}</h2>
        <p className="blog-date">{blogDate.toDateString()}</p>
        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: blogPost.body }}
        />
        <div className="blog-footer">
          <h3 className="blog-tags-header">В этой публикации</h3>
          <div className="blog-tags">{tags}</div>
        </div>
      </div>
    );
  }

  _getTags() {
    return blogPost.tags.map(tag => {
      return <BlogTag name={tag.name} color={tag.color} key={tag.id} />;
    });
  }
}

class BlogTag extends React.Component {
  render() {
    const tagStyle = {
      backgroundColor: this.props.color
    };
    return (
      <a href="#" className="blog-tag" style={tagStyle}>
        #{this.props.name}
      </a>
    );
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      ShowComments: false
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Показать комментарии";
    let buttonClass = "comment-toggle";
    if (this.state.ShowComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
      buttonText = "Скрыть комментарии";
      buttonClass = "comment-toggle __active";
    }
    return (
      <div className="comment-box">
        <div className="comment-top">
          <h2 className="comment-header">Комментарии</h2>
          <p className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </p>
        </div>
        <div className="comment-control">
          <button
            className={buttonClass}
            onClick={this._handleClick.bind(this)}
          >
            {buttonText}
          </button>
        </div>
        {commentNodes}
      </div>
    );
  }

  _getComments() {
    return commentList.map(comment => {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentQty) {
    if (commentQty === 0) {
      return "Нет комментариев";
    } else if (commentQty > 10 && commentQty < 20) {
      return `${commentQty} комментариев`;
    } else if (commentQty % 10 === 1) {
      return `${commentQty} комментарий`;
    } else if (commentQty % 10 > 1 && commentQty % 10 < 5) {
      return `${commentQty} комментария`;
    } else {
      return `${commentQty} комментариев`;
    }
  }

  _handleClick() {
    this.setState({
      ShowComments: !this.state.ShowComments
    });
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-author">{this.props.author}</p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            &times;
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BlogBox />, document.getElementById("blog-box"));

ReactDOM.render(<CommentBox />, document.getElementById("comment-box"));
