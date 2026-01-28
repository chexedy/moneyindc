import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="notfound">
            <div className="watermark">CLASSIFIED</div>
            <div className="memo-container">
                <div className="memo-header">
                    <p>MEMORANDUM FOR THE PUBLIC RECORD</p>
                    <p>FROM: DEPARTMENT OF JUSTICE (DOJ)</p>
                    <p>SUBJECT: 404-SIG-TRANSCRIPT</p>
                    <hr />
                </div>
                <div className="redacted-stamp">REDACTED</div>
                <div className="memo-title">
                    <h1>ERROR 404 - NOT FOUND</h1>
                </div>

                <div className="memo-body">
                    <p>
                        Unfortunately, a <span className="blackout" title="Unredact">special interest group</span> paid us $67,000 to hide this content from the public. If you’d like to see it, please <span className="blackout" title="Unredact">increase your campaign donation</span> and contact your local representative.
                    </p>
                    <p className="internal-memo">
                        <strong>UPDATE:</strong> Further access to this directory has been filibustered until the next fiscal cycle.
                    </p>
                </div>

                <div className="memo-footer">
                    <p>Return to the <a href="/">home page</a></p>
                    <p>File a grievance via the <a href="https://github.com/chexedy/moneyindc/issues" target="_blank" rel="noreferrer">GitHub Oversight Committee</a></p>
                </div>
            </div>
        </div>
    )
}