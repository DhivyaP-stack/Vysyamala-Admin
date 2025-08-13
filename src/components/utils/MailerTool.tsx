import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

const MailerTool = () => {
  const [editorContent, setEditorContent] = useState('');
  const [plainText, setPlainText] = useState('');
  console.log(plainText);
  // const stripHtmlTags = (html: string) => {
  //   return html.replace(/<[^>]*>/g, '');

  // };

  return (
    <>
      <div>
        <p className="text-red-600 text-xl font-semibold">
          Please contact admin for Futher Details
        </p>
        <p>Mailer Tool</p>
        <hr />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className=" flex flex-col w-full ">
          <label className=" text-black font-medium  ">Subject line</label>
          <input className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
        </div>
        <div className=" flex  flex-col w-full">
          <label className=" text-black font-medium ">To</label>
          <div className=" flex  flex-col">
            <div className="w-full">
              <div className="flex gap-2">
                <div>
                  <input type="checkbox" />
                  <label htmlFor="" className="ml-4 text-lg font-medium">
                    Male
                  </label>
                </div>

                <div>
                  <input type="checkbox" />
                  <label htmlFor="" className="ml-4 text-lg font-medium">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="flex  gap-2">
              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Free
                </label>
              </div>

              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Prospect
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Paid
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Offer
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Private
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  Others
                </label>
              </div>
            </div>
            <div className="flex">
              <input type="checkbox" />
              <label htmlFor="" className="ml-4 text-lg font-medium">
                Delete -Got Married /Married Settled
              </label>
            </div>
            <div className=" flex gap-2">
              <div className="flex">
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  No HoroScope
                </label>
              </div>
              <div className="flex">
                <input type="checkbox" />
                <label htmlFor="" className="ml-4 text-lg font-medium">
                  No Photo
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex  flex-col w-full ">
          <label className=" text-black font-medium ">From Age</label>
          <input className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-black font-medium ">To Age</label>
          <input className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-black font-medium ">From Reg Date</label>
          <input className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
        </div>
        <div className=" flex  flex-col">
          <label className=" text-black font-medium ">To Reg Date</label>
          <input className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
        </div>
      </div>
      <div className=" flex mt-2  flex-col">
        <label className=" text-black font-medium ">Profile id's</label>
        <textarea className="w-1/4 outline-none  px-4 py-2 border border-black rounded" />
      </div>
      <label className=" text-black font-medium ">Stars</label>
      <div className="mt-2 flex gap-2 ">
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Rohini
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Thiruvathira
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Hastha
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Swati
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Thiruvonam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Sadayam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Magam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Poosam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Mrigasira
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Ayilyam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Uthram
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Ashwini
          </label>
        </div>
      </div>
      <div className="mt-2 flex gap-2 ">
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Bharani
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Karthika
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Chitra
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Kettai{' '}
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Puratathi
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Revathi{' '}
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Vishakam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Uthram
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Anusham{' '}
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Moolam
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Uthram
          </label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="" className="ml-2 text-lg font-medium">
            Ashwini
          </label>
        </div>
      </div>
      <div className=" flex mt-2  flex-col">
        <label className=" text-black font-medium ">Profile id's</label>
        <input
          type="file"
          className="w-1/4 outline-none  px-4 py-2 border border-black rounded"
        />
      </div>
      <label className=" text-black font-medium  ">Message</label>
      <div className="custom-ckeditor-wrapper ">
        <CKEditor
          editor={ClassicEditor as any}
          data={plainText}
          onReady={(editor) => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData(); // HTML content
            setEditorContent(data); // Set HTML content state
            setPlainText(data); // Set plain text content state
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
    </>
  );
};

export default MailerTool;
