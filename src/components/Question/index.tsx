import { ReactNode } from "react";
import cx from "classnames";
import "./styles.scss";
// definindo o tipo de question
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

// criando o componente de question
export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return(
    <div className={cx(
      'question', 
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered },
      )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}

//https://youtu.be/d45eR43gZ7o?t=198